import { defineStore } from 'pinia';
import { useAuthStore } from './auth.store';
import { useFavoritesStore } from './favorites.store';

const auth = useAuthStore();
const favorites = useFavoritesStore();

export const useMainStore = defineStore('main', {
  state: () => ({
    auth,
    favorites,
  }),
});
