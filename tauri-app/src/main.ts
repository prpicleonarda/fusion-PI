import { createApp } from "vue";
import App from "./App.vue";
import "./firebase/config"; // Initialize Firebase
import "./styles/global.css";

createApp(App).mount("#app");
