// store/index.ts
import { defineStore } from "pinia";
import * as swapiService from "~/utils/swapi";

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

export const useStarWarsStore = defineStore("starWars", {
  state: () => ({
    planets: [] as Planet[],
    selectedPlanet: null as Planet | null,
    loading: false,
    error: null as string | null,
    favorites: [] as any,
    residentDetails: [] as any[],
  }),

  actions: {
    async fetchPlanets() {
      try {
        this.loading = true;
        this.planets = await swapiService.getPlanets();
      } catch (error: any) {
        this.error = error.message || "Failed to fetch planets";
      } finally {
        this.loading = false;
      }
    },

    /*async fetchPlanetDetails(url: any) {
      try {
        this.loading = true;
        this.selectedPlanet = await swapiService.getPlanetByUrl(url);
      } catch (error: any) {
        this.error = error.message || "Failed to fetch planet details";
      } finally {
        this.loading = false;
      }
    },
*/

    async fetchPlanetDetails(name: any) {
      try {
        this.loading = true;
        this.selectedPlanet = await swapiService.getPlanetByName(name);
      } catch (error: any) {
        this.error = error.message || "Failed to fetch planet details";
      } finally {
        this.loading = false;
      }
    },
    async fetchResidentDetails(residentUrls: string[]) {
      try {
        console.log("Fetching resident details for URLs:", residentUrls);
        this.residentDetails = await Promise.all(
          residentUrls.map(async (residentUrl) => {
            try {
              console.log("Fetching resident details for URL:", residentUrl);
              const residentData = await getResidentDetails(residentUrl);
              console.log("Resident data for", residentUrl, ":", residentData);
              return residentData;
            } catch (error) {
              console.error(
                "Error fetching resident details for",
                residentUrl,
                ":",
                error
              );
              return null;
            }
          })
        );
        console.log("Final resident details:", this.residentDetails);
      } catch (error) {
        console.error("Error fetching resident details:", error);
        throw error;
      }
    },

    toggleFavorite(planet: any) {
      const index = this.favorites.findIndex(
        (p: any) => p.name === planet.name
      );
      if (index === -1) {
        this.favorites.push(planet);
      } else {
        this.favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
    loadFavorites() {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        this.favorites = JSON.parse(favorites);
      }
    },
  },
});
