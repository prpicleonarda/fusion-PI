import { defineStore } from "pinia";
import { ref } from "vue";

export const useCacheStore = defineStore("cache", () => {
  const cache = ref(new Map<string, { data: any; timestamp: number }>());
  const maxAge = 5 * 60 * 1000; // 5 minutes

  const getCached = (key: string) => {
    const item = cache.value.get(key);
    if (item && Date.now() - item.timestamp < maxAge) {
      return item.data;
    }
    return null;
  };

  const setCached = (key: string, data: any) => {
    cache.value.set(key, { data, timestamp: Date.now() });
  };

  return { getCached, setCached };
});
