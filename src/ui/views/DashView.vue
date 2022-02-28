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
        <pre v-html="prettyJSON(takeUnlessBlank(metadata.request.body) ?? 'No content')"></pre>
      </template>
      <template #response>
        <pre v-html="prettyJSON(takeUnlessBlank(metadata.response.body) ?? 'No content')"></pre>
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
      const query = route.query.q
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
    },
    prettyJSON(json: string | null) {
      if (json) {
        try {
          json = JSON.parse(json)
        } catch (err) {
          return json
        }
      } else {
        return json
      }
      json = JSON.stringify(json, undefined, 2);
      json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        } else if (/\d+.?\d+/.test(match)) {
          cls = 'number'
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
    },
    takeUnlessBlank(item: string | null): string | null {
      if (!item) return null
      if (item.replace(RegExp("\w"), "").length == 0) return null
      return item as string
    }
  }
});
</script>

<style>
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
.key {
  color: var(--color-text);
}
.string {
  color: rgb(0, 182, 24);
}
.boolean {
  color: rgb(255, 208, 0);
}
.null {
  color: red;
}
.number {
  color: rgb(0, 140, 255);
}
</style>