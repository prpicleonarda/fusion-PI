<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToLogin = () => {
  router.push("/login");
};

const goToPrivacyPolicy = () => {
  router.push("/privacypolicy");
};
</script>

<template>
  <main
    class="container mx-auto px-4 py-10 text-center h-screen flex flex-col justify-center"
  >
    <div class="flex justify-center mb-4">
      <img
        src="/src/assets/fusion.svg"
        class="logo fusion h-32 w-32"
        alt="Fusion"
      />
    </div>

    <h1 class="text-4xl font-bold text-offblack mb-2 font-heading">FUSION.</h1>

    <p class="text-lg text-offgray mb-6 font-mono">
      Timetable app for all your needs
    </p>

    <div class="flex flex-col items-center justify-center font-mono">
      <button
        @click="goToLogin"
        class="text-lg text-offgray mb-4 bg-white border border-gray-300 rounded-full px-4 py-4"
      >
        Get Started
      </button>
    </div>

    <p @click="goToPrivacyPolicy">Privacy Policy</p>
  </main>
</template>
