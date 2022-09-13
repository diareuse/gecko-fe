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
      path: "/home",
      name: "home",
      component: () => import("@/ui/views/HomeView.vue"),
    }
  ],
});

export default router;
