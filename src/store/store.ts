import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { useFavoritesStore } from './favorites';

const auth = useAuthStore();
const favorites = useFavoritesStore();

export const useMainStore = defineStore('main', {
  state: () => ({
    auth,
    favorites,
  }),
});
