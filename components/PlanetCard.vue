<template>
  <div class="min-h-screen flex items-center justify-center bg-black">
    <div
      class="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-90/100"
    >
      <h1 v-if="planet" class="text-3xl font-bold mb-4 text-yellow-500">
        {{ planet.name }}
      </h1>

      <div
        v-if="planet"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div class="border-2 border-yellow-500 p-4 rounded-lg mb-4">
          <h2 class="text-xl font-bold mb-2 text-yellow-500">Info</h2>
          <p>
            <span class="font-semibold text-yellow-500">Climate:</span>
            {{ planet.climate }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Rotation Period:</span>
            {{ planet.rotation_period }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Orbital Period:</span>
            {{ planet.orbital_period }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Diameter:</span>
            {{ planet.diameter }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Gravity:</span>
            {{ planet.gravity }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Terrain:</span>
            {{ planet.terrain }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Surface Water:</span>
            {{ planet.surface_water }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Population:</span>
            {{ planet.population }}
          </p>
        </div>

        <div
          v-if="planet.residents && planet.residents.length > 0"
          class="border-2 border-yellow-500 p-4 rounded-lg mb-4"
        >
          <h2 class="text-xl font-bold mb-2 text-yellow-500">Residents</h2>
          <Residents :residents="planet.residents" />
        </div>

        <div class="border-2 border-yellow-500 p-4 rounded-lg mb-4">
          <h2 class="text-xl font-bold mb-2 text-yellow-500">Films</h2>
          <ul>
            <li v-for="film in planet.films" :key="film" class="mb-2">
              {{ film }}
            </li>
          </ul>
        </div>
      </div>

      <nuxt-link
        v-if="link"
        :to="link"
        class="block mt-4 text-yellow-500 hover:text-yellow-300"
        >{{ label }}</nuxt-link
      >
    </div>
  </div>
</template>


<script setup lang="ts">
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

interface Resident {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
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
//console.log("Planet data", planet?.residents);
</script>
