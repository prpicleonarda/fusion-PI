import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
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
