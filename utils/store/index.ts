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
    loading: true,
    error: null as string | null,
    favorites: [] as any,
    residentDetails: [] as any[],
    currentPage: 1,
    totalPages: 1,
  }),

  actions: {
    async fetchPlanets(page: number) {
      try {
        console.log("Fetching planets...");
        this.loading = true;
        const result = await swapiService.getPlanets(page);
        console.log("Fetched planets result:", result);
        this.planets = result.results;
        this.totalPages = Math.ceil(result.count / 10);
        this.currentPage = page;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch planets";
      } finally {
        this.loading = false;
        console.log("Loading state set to false.");
      }
    },

    async loadPreviousPage() {
      if (this.currentPage > 1) {
        try {
          this.loading = true;
          await this.fetchPlanets(this.currentPage - 1);
        } catch (error) {
          console.error("Error loading previous page:", error);
        } finally {
          this.loading = false;
        }
      }
    },

    async loadNextPage() {
      if (this.currentPage < this.totalPages) {
        try {
          this.loading = true;
          await this.fetchPlanets(this.currentPage + 1);
        } catch (error) {
          console.error("Error loading next page:", error);
        } finally {
          this.loading = false;
        }
      }
    },
    async fetchPlanetDetails(name: any) {
      try {
        this.loading = true;
        this.selectedPlanet = await swapiService.getPlanetByName(
          name,
          this.currentPage
        );
      } catch (error: any) {
        this.error = error.message || "Failed to fetch planet details";
      } finally {
        this.loading = false;
      }
    },

    async fetchResidentDetails(residentUrls: string[]) {
      try {
        //console.log("Fetching resident details for URLs:", residentUrls);
        this.residentDetails = await Promise.all(
          residentUrls.map(async (residentUrl) => {
            try {
              //console.log("Fetching resident details for URL:", residentUrl);
              const residentData = await getResidentDetails(residentUrl);
              //console.log("Resident data for", residentUrl, ":", residentData);
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
      //console.log("favorites inside", favorites);
      if (favorites) {
        this.favorites = JSON.parse(favorites);
      }
    },
  },
});
