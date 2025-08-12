<template>
  <div class="fixed inset-0 w-screen h-screen overflow-hidden -z-10">
    <video
      class="absolute inset-0 w-full h-full object-cover pointer-events-none"
      src="../assets/background.webm"
      autoplay
      loop
      muted
      playsinline
    ></video>
    <div
      class="absolute inset-0 w-full h-full bg-white/20 backdrop-blur-xl backdrop-saturate-125 pointer-events-none"
    ></div>
    <div class="relative w-full h-full z-10">
      <slot />
    </div>
  </div>
</template>
