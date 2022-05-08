import { defineStore } from 'pinia';
import { useAuthStore } from './auth.store';
import { useFavoritesStore } from './favorites.store';
import { useBasketStore } from './basket.store';

const auth = useAuthStore();
const favorites = useFavoritesStore();
const basket = useBasketStore();

export const useMainStore = defineStore('main', {
  state: () => ({
    auth,
    basket,
    favorites,
  }),
});
