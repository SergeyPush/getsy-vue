import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as Array<number>,
  }),

  getters: {
    hasFavorites: (state) => state.favorites.length > 0,
    isFavorite: (state) => (id: number) => state.favorites.includes(id),
  },

  actions: {
    addToFavorites(id: number) {
      if (this.favorites.includes(id)) {
        this.favorites = this.favorites.filter((item) => item !== id);
      } else {
        this.favorites.push(id);
      }
    },
  },
  persist: {
    key: 'favorites',
    paths: ['favorites'],
  },
});
