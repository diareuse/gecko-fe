import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/gecko/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  build: {
    target: ["esnext", "edge88", "firefox78", "chrome87", "safari14"],
    rollupOptions: {
      output: {
        compact: true,
        minifyInternalExports: true
      }
    }
  }
});
