<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import FirebaseAuth from "./components/FirebaseAuth.vue";
import Background from "./components/background.vue";
</script>

<template>
  <Background>
    <main
      class="container mx-auto px-4 py-10 text-center h-screen flex flex-col justify-center"
    >
      <div class="flex justify-center mb-8">
        <a
          href="https://vite.dev"
          target="_blank"
          class="hover:scale-110 transition-transform"
        >
          <img src="/vite.svg" class="logo vite h-24 w-24" alt="Vite logo" />
        </a>
      </div>

      <h1 class="text-4xl font-bold text-offblack mb-2 font-heading">
        FUSION .
      </h1>

      <p class="text-lg text-offgray mb-6 font-mono">
        Timetable app for all your needs.
      </p>

      <!-- Firebase Authentication Component -->
      <FirebaseAuth />
    </main>
  </Background>
</template>
