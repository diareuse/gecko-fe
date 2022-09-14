<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import ToolbarComponent from "./components/ToolbarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<template>
  <div>
    <ToolbarComponent />
    <RouterView />
    <FooterComponent />
  </div>
</template>

<style>
@import "@/ui/assets/base.css";
@import "@/ui/assets/typography.css";
@import "@/ui/assets/responsiveness.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
