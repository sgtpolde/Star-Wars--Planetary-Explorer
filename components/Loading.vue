<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50"
  >
    <div v-show="store.loading" class="text-white text-center max-w-2xl w-5/6">
      <h2 class="text-2xl font-bold mb-4">Loading...</h2>
      <p>{{ loadingText }}</p>
      <div class="flex items-center justify-center mt-4">
        <div
          class="w-80 bg-gray-700 border border-green-600 rounded-full h-3 overflow-hidden"
        >
          <div class="bg-green-400 h-full animate-progress"></div>
        </div>
      </div>
      <div v-show="store.error" class="text-red-500 mt-4">
        <p>An error occurred: {{ store.error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStarWarsStore } from "~/utils/store";

const loadingTexts = [
  "A long time ago, in a loading screen far, far away...",
  "May the loading force be with you",
  "Loading, you are. Patience, you must have.",
  "The loading is strong with this one.",
  "Waiting for the loading crawl...",
  "A loading screen, I sense. Much to load, it has.",
  "Loading at lightspeed!",
  "The Force is loading...",
  "In loading, we trust.",
  "Your loading screen, it is.",
];

const store = useStarWarsStore();
const loadingText = ref(loadingTexts[0]);
const loadingTextIndex = ref(1);

const startTextAnimation = () => {
  const updateText = () => {
    loadingText.value = loadingTexts[loadingTextIndex.value];
    loadingTextIndex.value = (loadingTextIndex.value + 1) % loadingTexts.length;
    setTimeout(updateText, 3000); // Change text every three seconds
  };

  updateText(); // Change text every three seconds, you can adjust the duration
};

onMounted(() => {
  startTextAnimation();
});
</script>

<style>
.animate-progress {
  animation: progressAnimation 3s linear infinite;
}

@keyframes progressAnimation {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
