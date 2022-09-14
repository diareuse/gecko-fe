import { createRouter, createWebHistory } from "vue-router";
import DashView from "../views/DashView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dash",
      component: DashView,
    },
    {
      path: "/requests",
      name: "requests",
      component: () => import("@/ui/views/RequestsView.vue"),
    }
  ],
});

export default router;
