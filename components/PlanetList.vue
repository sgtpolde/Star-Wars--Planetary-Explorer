<template>
  <div>
    <Loading v-show="planetsStore.loading" />
    <div v-show="!planetsStore.loading">
      <div
        class="bg-black text-white p-8 md:p-12 lg:p-16 min-h-screen grid place-content-center"
      >
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Star Wars Planets
          </h1>
          <!-- Toggle Button -->
          <button
            @click="toggleDisplayMode"
            class="text-green-300 text-3xl px-2 py-2 mb-3 rounded-full"
          >
            {{ displayFavorites ? "★ Favorites" : "☆ All" }}
          </button>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
        >
          <nuxt-link
            v-for="planet in displayPlanets"
            :key="planet.name"
            :to="`/planet/${planet.name}`"
          >
            <div
              class="border border-gray-700 transition-transform duration-300 ease-in-out hover:border-blue-500 transform hover:scale-105 rounded-lg bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 hover:from-gray-900 hover:via-gray-800 hover:to-gray-900"
            >
              <div class="p-4">
                <div
                  class="text-green-400 text-center hover:text-blue-300 text-lg block mb-2"
                >
                  🌍 {{ planet.name }}
                </div>
                <div class="text-center text-lg">
                  Population: {{ formatPopulation(planet.population) }}
                </div>
                <div class="text-center text-lg">
                  Diameter: {{ planet.diameter + " " + "km" }}
                </div>
                <div class="text-center text-lg">
                  Residents: {{ planet.residents.length }}
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>

        <!-- Pagination-->
        <div
          v-show="!displayFavorites"
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
            <button
              v-for="page in getVisiblePages"
              :key="page"
              @click="planetsStore.fetchPlanets(page)"
              :class="getPageButtonClass(page)"
            >
              {{ page }}
            </button>
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useStarWarsStore } from "~/utils/store";
import Loading from "./Loading.vue";

const planetsStore = useStarWarsStore();
const displayFavorites = ref(false);

onMounted(async () => {
  await planetsStore.loadFavorites();
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

const toggleDisplayMode = () => {
  displayFavorites.value = !displayFavorites.value;
};

const displayPlanets = computed(() => {
  return displayFavorites.value ? planetsStore.favorites : planetsStore.planets;
});

const formatPopulation = (value: string) => {
  return planetsStore.formatNumber(value);
};

const getPageButtonClass = (page: number) => {
  return {
    "bg-green-600": planetsStore.currentPage === page,
    "text-white": planetsStore.currentPage === page,
    "text-gray-800": planetsStore.currentPage !== page,
    "hover:bg-gray-300": planetsStore.currentPage !== page,
    "py-2": true,
    "px-4": true,
    rounded: true,
    "focus:outline-none": true,
  };
};

useHead(() => ({
  title: displayFavorites.value ? "SWPE - Favorite Planets" : "SWPE - All Planets",
  meta: [{ name: "description", content: "Star Wars: Planetary Explorer with Nuxt 3 & Pinia " }],
  bodyAttrs: {
    class: "test",
  },
}));
</script>
