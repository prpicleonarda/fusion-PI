<script setup lang="ts">
import FirebaseAuth from "./FirebaseAuth.vue";
</script>

<template>
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

    <h1 class="text-4xl font-bold text-offblack mb-2 font-heading">FUSION.</h1>

    <p class="text-lg text-offgray mb-6 font-mono">Sign in to get started</p>

    <!-- Firebase Authentication Component -->
    <FirebaseAuth />
  </main>
</template>
