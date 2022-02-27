import { createRouter, createWebHistory } from "vue-router";
import DashView from "../views/DashView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => ({
        name: 'dash',
        query: { q: to.query.q }
      })
    },
    {
      path: "/gecko",
      name: "dash",
      component: DashView,
    }
  ],
});

export default router;
