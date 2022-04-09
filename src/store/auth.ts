import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { logIn, signUp } from '../api/user.api';
import { AuthType } from '../types/auth.interface';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    firstName: '',
    lastName: '',
    email: '',
    accessToken: '',
    error: '',
  }),

  actions: {
    async logIn(authData: AuthType) {
      try {
        const { data } = await logIn(authData);
        this.error = '';
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.accessToken = data.accessToken;
      } catch (error) {
        const err = error as AxiosError;
        this.error = err.response?.data?.message;
      }
    },
    async signUp(authData: AuthType) {
      try {
        const { data } = await signUp(authData);
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.accessToken = data.accessToken;
      } catch (error) {
        const err = error as AxiosError;
        this.error = err.response?.data?.message;
      }
    },
    signOut() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.accessToken = '';
    },
    clearError() {
      this.error = '';
    },
  },

  getters: {
    isAuthenticated: (store) => !!store.accessToken,
  },
  persist: {
    key: 'user',
    paths: ['firstName', 'lastName', 'email', 'accessToken'],
  },
});
