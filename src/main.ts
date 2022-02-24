import { createApp } from "vue";

import router from "./ui/router";
import AppVue from "./ui/App.vue";

const app = createApp(AppVue);

app.use(router);

app.mount("#app");
