<template>
  <div class="line-parent">
    <div class="line-segment-monospaced line-segment-content">
      <slot name="request"></slot>
    </div>
    <div class="line-segment-metadata">
      <span class="line-icon">
        <slot name="icon"></slot>
      </span>
      <span class="line-name">
        <slot name="name"></slot>
      </span>
    </div>
    <div class="line-segment-monospaced line-segment-content">
      <slot name="response"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.line-parent {
  display: flex;
  margin-top: 2rem;
  align-items: flex-start;
  flex-flow: row;
  gap: 1rem;
}
.line-segment-content {
  flex-grow: 1;
  flex-basis: 0;
  background: #2d2d2d;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  min-width: 0;
}
.line-segment-content:first-of-type {
  margin-right: 1rem;
}
.line-segment-content:last-of-type {
  margin-left: 1rem;
}
.line-segment-monospaced {
  font-family: monospace;
}
.line-segment-metadata {
  flex-grow: 0;
  display: grid;
  min-width: 100px;
}
.line-segment-metadata * {
  margin: 0 auto;
}
.line-icon {
  padding: 0.5rem;
  border-width: 0.25rem;
  border-radius: 1rem;
  border-color: #2d2d2d;
  border-style: solid;
}
span {
  line-height: 1;
  color: white;
}
.line-name {
  margin-top: 0.5rem;
  font-weight: 600;
}
</style>