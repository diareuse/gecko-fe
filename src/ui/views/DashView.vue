<template>
  <div>
    <ToolbarComponent />
    <h1>Welcome to Gecko!</h1>
    <p>You can paste all the lines which Gecko spewed out below and then press Done!</p>
    <textarea v-model="content" id="append-input-box"></textarea>
    <p v-if="error">{{error}}</p>
    <button @keyup.enter="onDone" v-on:click="onDone">Done!</button>
    <h6>What happens to your requests?</h6>
    <p>We need the app to be secure and trustworthy. Therefore we never save the data you put in anywhere in the cloud.
      It's <strong>always</strong> stored in your own device, in this case - browser, and/or empherically processed.
      Leaving no trace of your home server or data anywhere. <sub>Unless like GitHub logs the urls, in that case, yeah
        it's their fault.</sub></p>
    <h6>What's the process?</h6>
    <p>
      All entries are processed accordingly:
    <ul>
      <li>Empherically inspect the lines you put into this text area</li>
      <li>Merge lines which should be merged</li>
      <li>Try to parse the data</li>
      <li>If successful, save the data into your browser</li>
      <li>Redirect and load!</li>
    </ul>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { GeckoCompositor } from "@/composition/gecko-compositor";
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ToolbarComponent from "../components/ToolbarComponent.vue";

const facade = GeckoCompositor.getFacade()
const processor = GeckoCompositor.getPartProcessor()

const content = ref('')
const error = ref(null as string | null)
const parts = computed(() => {
  return processor.process(content.value)
})

async function onDone(): Promise<void> {
  Promise
    .all(parts.value.map((it) => facade.getMetadata(it)))
    .catch(() => error.value = "There were errors with your input")
    .then(() => useRouter().push("/requests"))
}

async function findQuery(): Promise<string> {
  const query = useRoute().query.q
  if (query) {
    return query.toString()
  }
  throw new Error("Query not found")
}

onMounted(() => {
  findQuery()
    .then((it) => content.value = it)
    .then(() => onDone())
    .catch(() => document.getElementById("append-input-box")?.focus())
})

</script>

<style scoped>
textarea {
  min-width: 300px;
  background: var(--color-background-mute);
  color: var(--color-text);
  border-radius: 1rem;
  border: solid transparent;
  padding: 0.5rem 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  border-radius: 1rem;
  border: solid transparent;
  cursor: pointer;
  font-weight: 800;
}

.append-parent {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  align-items: center;
}

.append-parent>* {
  flex-grow: 1;
  flex-basis: 0;
}
</style>