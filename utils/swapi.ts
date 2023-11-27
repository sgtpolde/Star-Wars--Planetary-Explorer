// services/swapi.js
import axios from "axios";

const swapi = axios.create({
  baseURL: "https://swapi.dev/api/",
});

export const getPlanets = async () => {
  const response = await swapi.get("planets/");
  return response.data.results;
};

export async function getPlanetByUrl(url: string) {
  const response = await axios.get(url);
  return await response.data;
}

export async function getPlanetByName(name: string) {
  const allPlanets = await getPlanets();
  return allPlanets.find((planet: any) => planet.name.toLowerCase() === name.toLowerCase());
}

export const getResidentDetails = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log("Response from getResidentDetails:", response);
    return response.data;
  } catch (error) {
    console.error("Error in getResidentDetails:", error);
    throw error;
  }
};
