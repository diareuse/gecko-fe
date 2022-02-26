<template>
  <div class="dash-parent" v-if="metadata != null">
    <CallHeadline>
      <template #code>{{ metadata.response.code }}</template>
      <template #method>{{ metadata.request.method }}</template>
      <template #domain>Domain</template>
      <template #fragment>{{ metadata.request.url }}</template>
    </CallHeadline>
    <CallLine>
      <template #request>{{ metadata.request.headers }}</template>
      <template #response>{{ metadata.response.headers }}</template>
      <template #icon>
        <IconHeaders />
      </template>
      <template #name>Headers</template>
    </CallLine>
    <CallLine>
      <template #request>{{ metadata.request.contentType }}</template>
      <template #response>{{ metadata.response.contentType }}</template>
      <template #icon>
        <IconContentType />
      </template>
      <template #name>Content Type</template>
    </CallLine>
    <CallLine>
      <template #request>{{ metadata.request.body ?? "No Content" }}</template>
      <template #response>{{ metadata.response.body ?? "No Content" }}</template>
      <template #icon>
        <IconBody />
      </template>
      <template #name>Body</template>
    </CallLine>
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

const facade = GeckoCompositor.getFacade();

export default {
  components: {
    CallHeadline,
    CallLine,
    IconHeaders,
    IconContentType,
    IconBody,
  },
  mounted() {
    this.getMetadata()
      .then((it) => this.metadata = it)
      .catch((err) => console.log(err))
  },
  data() {
    return {
      loading: true,
      metadata: null as GeckoMetadata | null
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
};
</script>

<style scoped>
.dash-parent {
  width: 100%;
}
</style>