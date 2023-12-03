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
    favorites: [] as Planet | any,
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
        this.planets = result.results;
        this.totalPages = Math.ceil(result.count / 10);
        this.currentPage = page;
      } catch (error: any) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // Set a more meaningful error message
          this.error = `Failed to fetch planets. Server responded with ${error.response.status} `;
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from the server");
          this.error =
            "Failed to fetch planets. No response received from the server";
        } else {
          // Something happened in setting up the request that triggered an Error
          this.error = `Failed to fetch planets. Error: ${error.message}`;
        }
      } finally {
        if ((await this.error) === null) {
          //console.log("Loading state set to false.");
          this.loading = false;
        }
      }
    },

    async fetchPlanetDetails(name: any) {
      try {
        console.log("Fetching planet details...");
        this.loading = true;

        this.loadFavorites();

        // Check if the planet is a favorite
        const isFavorite = this.favorites.some(
          (favorite: any) => favorite.name === name
        );
        //console.log("Isfavorite: ", isFavorite);

        // If the planet is a favorite, fetch details with the associated page
        if (isFavorite) {
          const favoritePlanet = this.favorites.find(
            (favorite: any) => favorite.name === name
          );
          if (favoritePlanet) {
            //console.log("Page: ", favoritePlanet.page);

            this.selectedPlanet = await swapiService.getPlanetByName(
              name,
              favoritePlanet.page
            );
          }
        } else {
          // If not a favorite, fetch details with the current page
          this.selectedPlanet = await swapiService.getPlanetByName(
            name,
            this.currentPage
          );
        }
      } catch (error: any) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // Set a more meaningful error message
          this.error = `Failed to fetch planet details. Server responded with ${error.response.status} `;
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from the server");
          this.error =
            "Failed to fetch planet details. No response received from the server";
        } else {
          // Something happened in setting up the request that triggered an Error
          this.error = `Failed to fetch planet details. Error: ${error.message}`;
        }
      } finally {
        if ((await this.error) === null) {
          this.loading = false;
        }
      }
    },

    async fetchResidentDetails(residentUrls: string[]) {
      try {
        console.log("Fetching residents details...");
        this.loading = true;
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
        //console.log("Final resident details:", this.residentDetails);
      } catch (error: any) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // Set a more meaningful error message
          this.error = `Failed to fetch residents details. Server responded with ${error.response.status} `;
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from the server");
          this.error =
            "Failed to fetch residents details. No response received from the server";
        } else {
          // Something happened in setting up the request that triggered an Error
          this.error = `Failed to fetch residents details. Error: ${error.message}`;
        }
      } finally {
        if ((await this.error) === null) {
          this.loading = false;
        }
      }
    },

    toggleFavorite(planet: any) {
      const index = this.favorites.findIndex(
        (p: any) => p.name === planet.name
      );
      const planetWithPage = { ...planet, page: this.currentPage };

      if (index === -1) {
        this.favorites.push(planetWithPage);
      } else {
        this.favorites.splice(index, 1);
      }

      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },

    loadFavorites() {
      console.log("Loading favorite planets...");
      const favorites = localStorage.getItem("favorites");

      if (favorites) {
        this.favorites = JSON.parse(favorites);
        // Set the current page for each favorite planet
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
          if ((await this.error) === null) {
            console.log("Loading state set to false.");
            this.loading = false;
          }
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
          if ((await this.error) === null) {
            console.log("Loading state set to false.");
            this.loading = false;
          }
        }
      }
    },

    formatNumber(value: string) {
      const suffixes = ["K", "M", "B", "T", "Q"];
      let magnitude = 0;
      let num = parseFloat(value);

      if (isNaN(num)) {
        return value; // return as is if it's not a valid number
      }

      while (Math.abs(num) >= 1000 && magnitude < suffixes.length - 1) {
        magnitude += 1;
        num /= 1000.0;
      }

      return `${num.toFixed(1)}${suffixes[magnitude] || ""}`;
    },
  },
});
