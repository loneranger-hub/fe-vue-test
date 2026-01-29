<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center text-white">
      <NuxtLink 
        to="/chats" 
        class="inline-block px-8 py-3 bg-white text-indigo-500 rounded-full font-semibold transition-all duration-300 text-base hover:-translate-y-0.5 hover:shadow-lg"
      >
        Go to chat section
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "FE task 2026",
});
</script>
