<script setup lang="ts">
// import { ref } from "vue";
// import { invoke } from "@tauri-apps/api/core";
import FirebaseAuth from "./views/Login/FirebaseAuth.vue";
import Background from "./components/common/background.vue";
</script>

<template>
  <Background>
    <main
      class="container mx-auto px-4 py-10 text-center h-screen flex flex-col justify-center"
    >
      <div class="flex justify-center mb-8">
        <img
          src="/src/assets/fusion.svg"
          class="logo fusion h-32 w-32"
          alt="Fusion"
        />
      </div>

      <h1 class="text-4xl font-bold text-offblack mb-2 font-heading">
        FUSION.
      </h1>

      <p class="text-lg text-offgray mb-6 font-mono">
        Timetable app for all your needs
      </p>

      <!-- Firebase Authentication Component -->
      <FirebaseAuth />
    </main>
  </Background>
</template>
