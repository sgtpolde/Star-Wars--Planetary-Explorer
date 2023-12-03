<template>
  <Loading v-if="loading" />
  <template v-else>
    <PlanetCard :planet="planet" :label="'Back to Planet List'" :link="'/'" />
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStarWarsStore } from "~/utils/store";
import PlanetCard from "~/components/PlanetCard.vue";
import Loading from "./Loading.vue";

const planetsStore = useStarWarsStore();
const planet = ref<any | null>(null);
const loading = ref(true);
const route = useRoute();

onMounted(async () => {
  try {
    const planetName = route.params.name as string;
    await planetsStore.fetchPlanetDetails(planetName);
    //console.log(await planetsStore.fetchPlanetDetails(planetName, 2))
    planet.value = planetsStore.selectedPlanet;
  } catch (error) {
    console.error("Error fetching planet details:", error);
  } finally {
    loading.value = false;
  }
});

useHead(() => ({
  title: planet.value ? planet.value.name : "Loading...", // Set the title dynamically
  meta: [
    {
      name: "description",
      content: "Star Wars: Planetary Explorer with Nuxt 3 & Pinia ",
    },
  ],
  bodyAttrs: {
    class: "test",
  },
}));
</script>
