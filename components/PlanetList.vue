<template>
  <div class="bg-black text-white p-4 md:p-8 lg:p-12 xl:p-16 h-screen flex flex-col justify-center items-center">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
      Star Wars Planets
    </h1>

    <Loading v-if="loading" />

    <ul v-else class="list-none w-full max-w-md">
      <li
        v-for="planet in planets"
        :key="planet.name"
        class="mb-4 border-b border-gray-700 py-4 px-6 lg:px-8 transition-transform duration-300 ease-in-out hover:border-blue-500 transform hover:scale-105 flex items-center"
      >
        <div class="mr-4">
          🌍
          <!-- Globe emoji -->
        </div>
        <div class="flex-1">
          <nuxt-link :to="`/planet/${planet.name}`" class="text-yellow-500 hover:text-blue-300 block">
            {{ planet.name }}
          </nuxt-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStarWarsStore } from '~/utils/store';
import Loading from './Loading.vue';

const planetsStore = useStarWarsStore();
const planets = ref<Planet[]>([]);
const loading = ref(true);

onMounted(async () => {
  await planetsStore.fetchPlanets();
  planets.value = planetsStore.planets;
  loading.value = false;
});

interface Planet {
  name: string;
  url: string;
}
</script>
