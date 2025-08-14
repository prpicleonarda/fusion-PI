import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home/HomeView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/privacypolicy",
    name: "Privacy Policy",
    component: () => import("../views/PrivacyPolicy/PrivacyPolicy.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Auth guard with direct Firebase auth
router.beforeEach((to, _from, next) => {
  const auth = getAuth();

  // Check if user is authenticated
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe(); // Unsubscribe immediately

    console.log(
      "Router guard - User state:",
      user ? "Logged in" : "Not logged in"
    );
    console.log("Router guard - Navigating to:", to.path);

    if (to.meta.requiresAuth && !user) {
      console.log("Router guard - Redirecting to home (auth required)");
      next("/");
    } else if (to.name === "Home" && user) {
      console.log("Router guard - Redirecting to dashboard (user logged in)");
      next("/dashboard");
    } else {
      console.log("Router guard - Proceeding to:", to.path);
      next();
    }
  });
});

export default router;
