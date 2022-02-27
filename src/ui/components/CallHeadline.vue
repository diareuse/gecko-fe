<template>
  <div class="headline-parent">
    <span class="headline-code">
      <slot name="code"></slot>
    </span>
    <span class="headline-method">
      <slot name="method"></slot>
    </span>
    <span class="headline-fragment">
      <slot name="fragment"></slot>
    </span>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.headline-code {
  background: green;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  margin-right: 0.5rem;
  font-weight: 800;
}
.headline-method {
  background: aqua;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  margin-right: 0.5rem;
  font-weight: 800;
}
.headline-domain {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.8);
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