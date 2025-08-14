import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./firebase/config";
import "./styles/global.css";
import router from "./router/router";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
