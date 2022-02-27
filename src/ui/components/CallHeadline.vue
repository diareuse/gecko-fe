<template>
  <div class="headline-parent">
    <span class="headline-code" :style="{ backgroundColor: responseCodeColor }">
      <slot name="code"></slot>
    </span>
    <span class="headline-method" :style="{ backgroundColor: requestMethodColor }">
      <slot name="method"></slot>
    </span>
    <span class="headline-fragment">
      <slot name="fragment"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    responseCode: Number,
    requestMethod: String
  },
  computed: {
    responseCodeColor(): string {
      const code = this.responseCode ?? 0
      if (code < 300) return "#00FF00"
      else if (code < 400) return "#00FFFF"
      else if (code < 500) return "#FFFF00"
      else if (code < 600) return "#FF0000"
      else return "#0000FF"
    },
    requestMethodColor(): string {
      const method = this.requestMethod ?? "";
      if ("get" === method.toLowerCase()) return "#89D1B6"
      else if ("head" === method.toLowerCase()) return "#5658D3"
      else if ("post" === method.toLowerCase()) return "#4E9FFA"
      else if ("put" === method.toLowerCase()) return "#9EA4B4"
      else if ("delete" === method.toLowerCase()) return "#FD7D78"
      else if ("connect" === method.toLowerCase()) return "#D68EF0"
      else if ("options" === method.toLowerCase()) return "#E2CA8C"
      else if ("trace" === method.toLowerCase()) return "#91E074"
      else if ("patch" === method.toLowerCase()) return "#9F7685"
      else return "transparent"
    }
  }
});
</script>

<style scoped>
.headline-code {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: black;
  margin-right: 0.5rem;
  font-weight: 800;
}
.headline-method {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: black;
  margin-right: 0.5rem;
  font-weight: 800;
}
.headline-fragment {
  font-family: monospace;
}
.headline-parent {
  width: 100%;
}
</style>