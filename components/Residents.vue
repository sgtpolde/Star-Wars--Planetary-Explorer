<template>
  <div class="">
    <!-- Show loading message when data is being fetched -->
    <Loading v-if="loading" />

    <!-- Display list of residents -->
    <ul v-else-if="!selectedResident" class="">
      <li
        v-for="(resident, index) in residentsWithDetails"
        :key="index"
        class="bg-gray-800 p-2 rounded-lg"
      >
        <!-- Destructure resident object for cleaner template -->
        <div class="flex items-center">
          <span
            @click="selectResident(index)"
            class="cursor-pointer text-white hover:underline"
            >{{ index + 1 }}. {{ resident.details.name }}</span
          >
        </div>
      </li>
    </ul>

    <!-- Display details for the selected resident -->
    <div v-else class="bg-gray-800 p-4 rounded-lg">
      <h3 class="text-2xl font-bold mb-4 text-yellow-500">Resident Details | {{ selectedResident.details.name }} </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p>
            <span class="font-semibold text-yellow-500">Name:</span>
            {{ selectedResident.details.name }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Height:</span>
            {{ selectedResident.details.height }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Mass:</span>
            {{ selectedResident.details.mass }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Gender:</span>
            {{ selectedResident.details.gender }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Hair Color:</span>
            {{ selectedResident.details.hair_color }}
          </p>
        </div>
        <div>
          <p>
            <span class="font-semibold text-yellow-500">Skin Color:</span>
            {{ selectedResident.details.skin_color }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Eye Color:</span>
            {{ selectedResident.details.eye_color }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Birth Year:</span>
            {{ selectedResident.details.birth_year }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Homeworld:</span>
            {{ selectedResident.details.homeworld }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <p>
            <span class="font-semibold text-yellow-500">Species:</span>
            {{ selectedResident.details.species }}
          </p>
          <p>
            <span class="font-semibold text-yellow-500">Vehicles:</span>
            {{ selectedResident.details.vehicles }}
          </p>
        </div>
        <div>
          <p>
            <span class="font-semibold text-yellow-500">Starships:</span>
            {{ selectedResident.details.starships }}
          </p>
          <!-- Add other properties as needed -->
        </div>
      </div>

      <button
        @click="deselectResident"
        class="mt-4 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full"
      >
        Back to List
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import { useStarWarsStore } from "~/utils/store";
import Loading from "./Loading.vue";

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

interface ResidentsProps {
  residents: string[];
}

const { residents } = defineProps<ResidentsProps>();
const planetsStore = useStarWarsStore();
const residentsWithDetails = ref<any[]>([]);
const loading = ref<boolean>(false);
const selectedResident = ref<any | null>(null);

onMounted(async () => {
  try {
    loading.value = true; // Set loading state to true before fetching data
    console.log("Resident URLs:", residents);
    await planetsStore.fetchResidentDetails(residents);

    // Combine resident URL and details for better template readability
    residentsWithDetails.value = residents.map((url, index) => ({
      url,
      details: planetsStore.residentDetails[index],
    }));

    console.log("Details:", residentsWithDetails);
  } catch (error) {
    console.error("Error fetching resident details:", error);
  } finally {
    loading.value = false; // Set loading state to false after fetching data
  }
});

const selectResident = (index: number) => {
  selectedResident.value = residentsWithDetails.value[index];
};

const deselectResident = () => {
  selectedResident.value = null;
};
</script>
