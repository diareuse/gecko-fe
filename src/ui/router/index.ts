import { createRouter, createWebHistory } from "vue-router";
import DashView from "../views/DashView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:params',
      redirect: to => ({
        name: 'dash',
        params: { baseData: to.params.params }
      })
    },
    {
      path: "/gecko/:baseData",
      name: "dash",
      component: DashView,
    }
  ],
});

export default router;
