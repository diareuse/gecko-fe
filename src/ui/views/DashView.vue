<template>
  <div>
    <ToolbarComponent />
    <div class="g-columns">
      <div>
        <span class="g-label">Q/A</span>
        <h6>What happens to your requests?</h6>
        <p>We need the app to be secure and trustworthy. Therefore we never save the data you put in anywhere in the
          cloud.
          It's <strong>always</strong> stored in your own device, in this case - browser, and/or ephemerally processed.
          Leaving no trace of your home server or data anywhere.
          <sub>Unless like GitHub logs the urls, in that case, yeah it's their fault.</sub>
        </p>
        <h6>What's the process?</h6>
        <p>
          All entries are processed accordingly:
        <ul>
          <li>Inspect the lines you put into this text area</li>
          <li>Merge lines which should be merged</li>
          <li>Try to parse the data</li>
          <li>If successful, save the data into your browser</li>
          <li>Redirect and load!</li>
        </ul>
        </p>
      </div>
      <div>
        <span class="g-label">Paste Content Here!</span>
        <textarea v-model="content" id="append-input-box"></textarea>
        <p v-if="error">{{error}}</p>
        <button id="g-positive" class="animated" @keyup.enter="onDone" v-on:click="onDone">Done!</button>
      </div>
    </div>
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
const router = useRouter()

const content = ref('')
const error = ref(null as string | null)
const parts = computed(() => {
  return processor.process(content.value)
})

async function onDone(): Promise<void> {
  Promise
    .all(parts.value.map((it) => facade.getMetadata(it)))
    .catch(() => error.value = "There were errors with your input")
    .then(() => router.push("/requests"))
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
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  resize: none;
  background: var(--color-background);
  color: var(--color-text);
  border-radius: 16px;
  border: solid transparent;
  padding: 16px;
  font-size: 10px;
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

.g-columns {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  margin-top: 32px;
}

.g-columns>div {
  flex-basis: 50%;
  padding: 32px;
  margin-right: 32px;
  background-color: var(--color-background-mute);
  border-radius: 16px;
}

.g-columns>div:last-child {
  margin-right: 0;
}

.g-label {
  position: absolute;
  top: 0;
  font-size: 12px;
  font-weight: 800;
  background-color: var(--color-background);
  padding: 4px 8px;
  line-height: 16px;
  margin-top: -10px;
  border-radius: 10000px;
}

button#g-positive {
  position: absolute;
  bottom: -12px;
  right: 32px;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 12px;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: 1000px;
  border: solid transparent;
  cursor: pointer;
  font-weight: 800;
}

button#g-positive:hover {
  padding: 8px 16px;
  font-size: 14px;
  line-height: 14px;
  bottom: calc(-8px - (14px / 2));
  right: calc(32px - 6px);
}

h6:first-of-type {
  padding-top: 0;
}

h6 {
  padding-top: 16px;
  padding-bottom: 8px;
}
</style>