// services/swapi.js
import axios from "axios";

const swapi = axios.create({
  baseURL: "https://swapi.dev/api/",
});

/*export const getPlanets = async () => {
  const response = await swapi.get("planets/");
  return response.data.results;
};
*/

export const getPlanets = async (page: number) => {
  const response = await swapi.get(`/planets/?page=${page}`);
  //console.log(response);
  const data = await response.data;
  return data;
};

export const getPlanetByUrl = async (url: string) => {
  const response = await axios.get(url);
  return await response.data;
};

export const getPlanetByName = async (name: string, page: number) => {
  const { results } = await getPlanets(page);
  //console.log("results: ", results);
  return results.find(
    (planet: any) => planet.name.toLowerCase() === name.toLowerCase()
  );
};

export const getResidentDetails = async (url: string) => {
  try {
    const response = await axios.get(url);
    //console.log("Response from getResidentDetails:", response);
    return response.data;
  } catch (error) {
    console.error("Error in getResidentDetails:", error);
    throw error;
  }
};
