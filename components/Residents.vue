<template>
  <div>
    <Loading :error="planetsStore.error" v-if="loading" />

    <ul v-else-if="!selectedResident" class="space-y-2">
      <li
        v-for="(resident, index) in residentsWithDetails"
        :key="index"
        class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 cursor-pointer"
        @click="selectResident(index)"
      >
        <div class="flex items-center">
          <span class="text-white"
            >{{ index + 1 }}. {{ resident.details.name }}</span
          >
        </div>
      </li>
    </ul>

    <div v-else class="bg-gray-800 p-4 rounded-lg">
      <div v-if="selectedResident">
        <p v-for="property in residentProperties" :key="property.key">
          <span class="font-semibold text-green-400"
            >{{ property.label }}:</span
          >
          {{ property.value(selectedResident) }}
        </p>
      </div>

      <button
        @click="deselectResident"
        class="mt-4 bg-green-500 text-gray-900 px-3 py-1 rounded-full hover:bg-green-400"
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

interface ResidentDetails {
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
}

interface ResidentWithDetails {
  url: string;
  details: ResidentDetails;
}

interface ResidentsProps {
  residents: string[];
}

const { residents } = defineProps<ResidentsProps>();
const planetsStore = useStarWarsStore();
const residentsWithDetails = ref<ResidentWithDetails[]>([]);
const loading = ref<boolean>(false);
const selectedResident = ref<ResidentWithDetails | null>(null);

const residentProperties = [
  {
    key: "name",
    label: "Name",
    value: (resident: ResidentWithDetails) => resident.details.name,
  },
  {
    key: "height",
    label: "Height",
    value: (resident: ResidentWithDetails) => `${resident.details.height} cm`,
  },
  {
    key: "mass",
    label: "Mass",
    value: (resident: ResidentWithDetails) => `${resident.details.mass} kg`,
  },
  {
    key: "gender",
    label: "Gender",
    value: (resident: ResidentWithDetails) => resident.details.gender,
  },
  {
    key: "birth_year",
    label: "Birth Year",
    value: (resident: ResidentWithDetails) => resident.details.birth_year,
  },
];

onMounted(async () => {
  try {
    loading.value = true;
    await planetsStore.fetchResidentDetails(residents);
    residentsWithDetails.value = residents.map((url, index) => ({
      url,
      details: planetsStore.residentDetails[index],
    }));
  } catch (error) {
    console.error("Error fetching resident details:", error);
  } finally {
    loading.value = false;
  }
});

const selectResident = async (index: number) => {
  selectedResident.value = residentsWithDetails.value[index];
};

const deselectResident = () => {
  selectedResident.value = null;
};
</script>
