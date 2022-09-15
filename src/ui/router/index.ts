import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dash",
      component: () => import("@/ui/views/DashView.vue"),
    },
    {
      path: "/requests",
      name: "requests",
      component: () => import("@/ui/views/RequestsView.vue"),
    }
  ],
});

export default router;
