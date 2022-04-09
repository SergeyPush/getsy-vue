import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

const auth = useAuthStore();
export const useMainStore = defineStore('main', {
  state: () => ({
    auth,
    name: 'Alehandro',
  }),
});
