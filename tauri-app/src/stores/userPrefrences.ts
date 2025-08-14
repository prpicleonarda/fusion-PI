import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserPreferencesStore = defineStore("userPreferences", () => {
  const preferences = ref({
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
  });

  type PreferenceKey = keyof typeof preferences.value;

  const updatePreference = (key: PreferenceKey, value: string) => {
    preferences.value[key] = value;
  };

  return { preferences, updatePreference };
});
