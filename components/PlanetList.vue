<template>
  <Loading v-if="planetsStore.loading" />
  <div v-else>
    <div
      class="bg-black text-white p-8 md:p-12 lg:p-16 min-h-screen grid place-content-center"
    >
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center">
        Star Wars Planets
      </h1>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
      >
        <nuxt-link
          v-for="planet in planets"
          :key="planet.name"
          :to="`/planet/${planet.name}`"
        >
          <div
            class="border border-gray-700 transition-transform duration-300 ease-in-out hover:border-blue-500 transform hover:scale-105 rounded-lg bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 hover:from-gray-900 hover:via-gray-800 hover:to-gray-900"
          >
            <div class="p-4">
              <div
                class="text-yellow-500 text-center hover:text-blue-300 text-lg block mb-2"
              >
                🌍 {{ planet.name }}
              </div>
              <div class="text-center text-lg">
                Population: {{ planet.population }}
              </div>
              <div class="text-center text-lg">
                Diameter: {{ planet.diameter }}
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <!-- Pagination-->
      <div
        class="flex flex-col items-center justify-center space-y-4 mt-8 sm:flex-row sm:space-y-0 sm:space-x-4"
      >
        <button
          @click="planetsStore.loadPreviousPage"
          :disabled="planetsStore.currentPage === 1"
          class="hidden sm:block w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l focus:outline-none"
        >
          Previous
        </button>
        <div class="flex items-center space-x-4">
          <div v-for="page in getVisiblePages">
            <button
              :key="page"
              @click="planetsStore.fetchPlanets(page)"
              :class="{
                'bg-indigo-600': planetsStore.currentPage === page,
                'text-white': planetsStore.currentPage === page,
                'text-gray-800': planetsStore.currentPage !== page,
                'hover:bg-gray-300': planetsStore.currentPage !== page,
                'py-2': true,
                'px-4': true,
                rounded: true,
                'focus:outline-none': true,
              }"
            >
              {{ page }}
            </button>
          </div>
        </div>
        <button
          @click="planetsStore.loadNextPage"
          :disabled="planetsStore.currentPage === planetsStore.totalPages"
          class="hidden sm:block w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useStarWarsStore } from "~/utils/store";
import Loading from "./Loading.vue";

const planetsStore = useStarWarsStore();
const planets = computed(() => planetsStore.planets);

onMounted(async () => {
  await planetsStore.fetchPlanets(planetsStore.currentPage);
});

const getVisiblePages = computed(() => {
  const currentPage = planetsStore.currentPage;
  const totalPages = planetsStore.totalPages;
  const maxVisiblePages = 5;

  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
});
</script>
