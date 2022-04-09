import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    firstName: '',
    lasttName: '',
    email: '',
    accessToken: '',
  }),

  getters: {
    isAuthenticated: (store) => !!store.accessToken,
  },
});
