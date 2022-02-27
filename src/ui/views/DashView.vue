<template>
  <div class="dash-parent" v-if="metadata != null">
    <CallHeadline :response-code="metadata.response.code" :request-method="metadata.request.method">
      <template #code>{{ metadata.response.code }}</template>
      <template #method>{{ metadata.request.method }}</template>
      <template #fragment>{{ metadata.request.url }}</template>
    </CallHeadline>
    <CallLine>
      <template #request>
        <pre>{{ metadata.request.headers.join('\n') }}</pre>
      </template>
      <template #response>
        <pre>{{ metadata.response.headers.join('\n') }}</pre>
      </template>
      <template #icon>
        <IconHeaders />
      </template>
      <template #name>Headers</template>
    </CallLine>
    <CallLine>
      <template #request>
        <pre>{{ metadata.request.contentType }}</pre>
      </template>
      <template #response>
        <pre>{{ metadata.response.contentType }}</pre>
      </template>
      <template #icon>
        <IconContentType />
      </template>
      <template #name>Content Type</template>
    </CallLine>
    <CallLine>
      <template #request>
        <pre>{{ metadata.request.body ?? "No Content" }}</pre>
      </template>
      <template #response>
        <pre>{{ metadata.response.body ?? "No Content" }}</pre>
      </template>
      <template #icon>
        <IconBody />
      </template>
      <template #name>Body</template>
    </CallLine>
  </div>
  <div v-if="metadata == null">
    <AppendBlock />
  </div>
</template>

<script lang="ts">
import CallHeadline from "../components/CallHeadline.vue";
import CallLine from "../components/CallLine.vue";
import IconHeaders from "../components/icons/IconHeaders.vue";
import IconContentType from "../components/icons/IconContentType.vue";
import IconBody from "../components/icons/IconBody.vue";
import { useRoute } from "vue-router";
import { GeckoCompositor } from "@/composition/gecko-compositor";
import type { GeckoMetadata } from "@/domain/model/gecko-metadata";
import { defineComponent, ref } from "vue";
import AppendBlock from "../components/AppendBlock.vue";

const facade = GeckoCompositor.getFacade();

export default defineComponent({
  components: {
    CallHeadline,
    CallLine,
    IconHeaders,
    IconContentType,
    IconBody,
    AppendBlock
  },
  created() {
    this.getMetadata()
      .then((it) => {
        this.metadata = it
      })
      .catch((err) => console.log(err))
  },
  setup() {
    const metadata = ref(null as GeckoMetadata | null)
    return {
      metadata
    }
  },
  methods: {
    getQuery(): string | null {
      const route = useRoute()
      const query = route.query["q"]
      if (query == null || query === undefined) {
        return null
      }
      return query.toString()
    },
    async getMetadata(): Promise<GeckoMetadata> {
      const query = this.getQuery()
      if (query == null) {
        throw new Error("Missing query parameter")
      }
      return await facade.getMetadata(query)
    }
  }
});
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