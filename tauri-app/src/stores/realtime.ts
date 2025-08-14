//import { collection, onSnapshot } from "firebase/firestore";
import { defineStore } from "pinia";
//import { ref } from "vue";

export const useRealtimeStore = defineStore("realtime", () => {
  /*const onlineUsers = ref<User[]>([]);
  const liveUpdates = ref<Update[]>([]);

  const subscribeToUpdates = () => {
    // Firebase real-time listeners
    const unsubscribe = onSnapshot(
      collection(db, "updates"),
      (snapshot: { docs: any[] }) => {
        liveUpdates.value = snapshot.docs.map((doc) => doc.data());
      }
    );
    return unsubscribe;
  };

  return { onlineUsers, liveUpdates, subscribeToUpdates };
*/
});
