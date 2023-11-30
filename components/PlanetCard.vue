<template>
  <div class="min-h-screen flex items-center justify-center bg-black">
    <div
      class="bg-gray-900 w-full h-3/4 md:w-3/4 lg:w-1/2 text-white p-4 md:p-8 rounded-lg shadow-lg"
    >
      <div class="flex items-center">
        <h1
          v-if="planet"
          class="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-green-400"
        >
          {{ planet.name }} -
        </h1>
        <button
          @click="toggleFavorite"
          class="text-green-300 text-3xl px-2 py-2 mb-5 rounded-full"
        >
          {{ isFavorite ? "★" : "☆" }}
        </button>
      </div>

      <div
        v-if="planet"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8"
      >
        <!-- Planet Information -->
        <div
          class="border-2 border-green-400 p-4 md:p-6 rounded-lg mb-4 md:mb-8 bg-gradient-to-br from-green-900 to-teal-900"
        >
          <h2 class="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-green-400">
            Planet Information
          </h2>

          <div class="grid grid-cols-1 gap-2 md:gap-4">
            <div
              v-for="info in planetInfo"
              :key="info.label"
              class="flex items-center border-b border-white pb-2 md:pb-4 mb-2 md:mb-4 gap-1"
            >
              <span class="font-semibold text-green-400"
                >{{ info.label }}:</span
              >
              <span>{{ info.value }}</span>
            </div>
          </div>
        </div>

        <!-- Residents -->
        <div
          class="border-2 border-green-400 p-4 md:p-6 rounded-lg mb-4 md:mb-8 bg-gradient-to-br from-green-900 to-teal-900"
        >
          <h2 class="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-green-400">
            Residents
          </h2>
          <Residents :residents="planet.residents" />
        </div>
      </div>

      <!-- Explore More Planets Link -->
      <nuxt-link
        v-if="link"
        :to="link"
        class="block mt-4 md:mt-6 text-green-400 hover:text-green-300"
      >
        {{ label }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStarWarsStore } from "~/utils/store";

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface PlanetCardProps {
  planet?: Planet | null;
  link?: string;
  label?: string;
}

const { planet, link, label } = defineProps<PlanetCardProps>();

const planetInfo = computed(() => {
  return planet
    ? [
        { label: "Climate", value: planet.climate },
        { label: "Rotation Period", value: planet.rotation_period },
        { label: "Orbital Period", value: planet.orbital_period },
        { label: "Diameter", value: planet.diameter },
        { label: "Gravity", value: planet.gravity },
        { label: "Terrain", value: planet.terrain },
        { label: "Surface Water", value: planet.surface_water },
        { label: "Population", value: planet.population },
      ]
    : [];
});

const planetsStore = useStarWarsStore();
onMounted(async () => {
  //console.log("Mounted. Favorites:", await planetsStore.loadFavorites());
  await planetsStore.loadFavorites();
});
const isFavorite = computed(() => {
  const favorites = planetsStore.favorites;
  console.log("favorites", favorites);
  return favorites.some((favPlanet: any) => favPlanet.name === planet?.name);
});
const toggleFavorite = () => {
  planetsStore.toggleFavorite(planet);
};
</script>
