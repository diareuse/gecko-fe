<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import ToolbarComponent from "./components/ToolbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <ToolbarComponent />
  <RouterView id="g-content" />
  <FooterComponent />
</template>

<style>
@import "@/ui/assets/base.css";
@import "@/ui/assets/typography.css";
@import "@/ui/assets/responsiveness.css";

#app {
  max-width: 1280px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 16px;

  display: flex;
  flex-direction: column;
  align-content: space-between;
}

#g-content {
  flex-grow: 1;
}
</style>
