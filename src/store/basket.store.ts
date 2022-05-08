import { defineStore } from 'pinia';

export const useBasketStore = defineStore('basket', {
  state: () => ({
    products: [],
    isOpen: false,
    isLoading: false,
  }),
  getters: {
    basketIsOpen: (store) => store.isOpen,
    basketLength: (store) => !!store.products.length,
  },
  actions: {
    openBasket() {
      this.isOpen = true;
    },
    closeBasket() {
      this.isOpen = false;
    },
  },
});
