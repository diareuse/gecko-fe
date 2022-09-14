<template>
  <div>
    <AppendBlock v-if="!metadata" />
    <div v-else>
      <h3>Your link is being processed</h3>
      <p>You will be automatically redirected once it's done.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { GeckoCompositor } from "@/composition/gecko-compositor";
import type { GeckoMetadata } from "@/domain/model/gecko-metadata";
import { ref } from "vue";
import AppendBlock from "../components/AppendBlock.vue";

const facade = GeckoCompositor.getFacade();
const metadata = ref(null as GeckoMetadata | null)

findMetadata()
  .then((it) => {
    metadata.value = it
    useRouter().push("/home")
  })
  .catch((err) => console.log(err))

async function findMetadata(): Promise<GeckoMetadata> {
  const query = await findQuery()
  return await facade.getMetadata(query)
}

async function findQuery(): Promise<string> {
  const route = useRoute()
  const query = route.query.q
  if (!query) {
    throw new Error("Query not found")
  }
  return query.toString()
}
</script>

<style scoped>
.dash-parent {
  width: 100%;
}

pre {
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

pre::-webkit-scrollbar {
  display: none;
}
</style>