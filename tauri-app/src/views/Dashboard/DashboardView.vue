<script setup lang="ts">
import { useAuth } from "../../composables/useAuth";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const { user, signOut, userName, loading } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  try {
    await signOut();
    router.push("/");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// Redirect if not authenticated
onMounted(() => {
  if (!loading.value && !user.value) {
    router.push("/");
  }
});
</script>

<template>
  <div v-if="loading" class="flex items-center justify-center h-screen">
    <div
      class="animate-spin rounded-full h-32 w-32 border-b-2 border-white"
    ></div>
  </div>

  <main v-else-if="user" class="container mx-auto px-4 py-10">
    <div class="flex justify-between items-center mb-8">
      <div class="flex items-center space-x-4">
        <img
          src="/src/assets/fusion_white.svg"
          class="logo fusion h-12 w-12"
          alt="Fusion"
        />
        <h1 class="text-3xl font-bold text-offblack font-heading">Dashboard</h1>
      </div>

      <div class="flex items-center space-x-4">
        <span class="text-offgray font-medium"> Welcome, {{ userName }} </span>
        <button
          @click="handleLogout"
          class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        Welcome to Fusion Dashboard
      </h2>
      <p class="text-gray-600">
        This is your personal dashboard. More features coming soon!
      </p>
    </div>
  </main>

  <div v-else class="flex items-center justify-center h-screen">
    <div class="text-center">
      <p class="text-white text-lg mb-4">Not authenticated</p>
      <button
        @click="router.push('/')"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Go Home
      </button>
    </div>
  </div>
</template>
