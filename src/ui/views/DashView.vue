<template>
  <div class="dash-parent">
    <CallHeadline>
      <template #code>200</template>
      <template #method>POST</template>
      <template #domain>foo.bardoo.com</template>
      <template #fragment>/v1/foo/bar</template>
    </CallHeadline>
    <CallLine>
      <template #request>Authorization: Bearer</template>
      <template #response>X-Content-Foo: waves</template>
      <template #icon><IconHeaders /></template>
      <template #name>Headers</template>
    </CallLine>
    <CallLine>
      <template #request>application/json</template>
      <template #response>null</template>
      <template #icon><IconContentType /></template>
      <template #name>Content Type</template>
    </CallLine>
    <CallLine>
      <template #request>{ "foo": 1, "barfoo": "foo" }</template>
      <template #response>No content</template>
      <template #icon><IconBody /></template>
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
export default {
  components: {
    CallHeadline,
    CallLine,
    IconHeaders,
    IconContentType,
    IconBody,
  },
  created() {
      
  }
};
</script>

<style scoped>
.dash-parent {
  width: 100%;
}
</style>