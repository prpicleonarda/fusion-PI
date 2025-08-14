import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./firebase/config";
import "./styles/global.css";
import { routes } from "./router/routes";
import { createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const createApp = ViteSSG(
  App,
  { routes, history: createWebHistory() },
  ({ app, router }) => {
    const pinia = createPinia();
    app.use(pinia);

    // Only attach auth guard in client mode
    if (!import.meta.env.SSR) {
      router.beforeEach((to, _from, next) => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          unsubscribe();

          if (to.meta.requiresAuth && !user) {
            next("/");
          } else if (to.name === "Home" && user) {
            next("/dashboard");
          } else {
            next();
          }
        });
      });
    }
  }
);
