// src/stores/app.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const theme = ref<"light" | "dark">("dark");
  const sidebarCollapsed = ref(false);

  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  return {
    theme,
    sidebarCollapsed,
    toggleTheme,
  };
});
