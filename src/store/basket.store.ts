import { defineStore } from 'pinia';
import { ProductInterface } from '../types/product.interface';

export const useBasketStore = defineStore('basket', {
  state: () => ({
    products: [] as ProductInterface[],
    isOpen: false,
    isLoading: false,
  }),
  getters: {
    getBasket: (store) => store.products,
    getTotal: (store) =>
      store.products.reduce((acc, item) => acc + item.price, 0),
    basketHasProducts: (store) => store.products.length > 0,
    basketIsOpen: (store) => store.isOpen,
    basketLength: (store) => store.products.length,
  },
  actions: {
    addToBasket(product: ProductInterface) {
      this.isOpen = true;
      const isInBasket = this.products.find((item) => item.id === product.id);
      if (isInBasket) {
        return;
      }
      this.products.push(product);
    },
    removeFromBasket(product: ProductInterface) {
      this.products = this.products.filter((item) => item.id !== product.id);
    },

    openBasket() {
      this.isOpen = true;
    },
    closeBasket() {
      this.isOpen = false;
    },
  },
  persist: {
    key: 'basket',
    paths: ['products'],
  },
});
