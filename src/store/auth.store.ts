import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { logIn, signUp } from '../api/user.api';
import { AuthType } from '../types/auth.interface';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    accessToken: '',
    error: '',
    isLoading: false,
    authIsOpen: false,
  }),
  getters: {
    isAuthenticated: (store) => !!store.accessToken,
    isAuthOpen: (store) => store.authIsOpen,
  },
  actions: {
    async logIn(authData: AuthType) {
      try {
        this.isLoading = true;
        const { data } = await logIn(authData);
        this.error = '';
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.accessToken = data.accessToken;
        this.id = data.id;
      } catch (error) {
        const err = error as AxiosError;
        this.error = err.response?.data?.message;
      } finally {
        this.isLoading = false;
      }
    },
    async signUp(authData: AuthType) {
      try {
        this.isLoading = true;
        const { data } = await signUp(authData);
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.accessToken = data.accessToken;
        this.id = data.id;
      } catch (error) {
        const err = error as AxiosError;
        this.error = err.response?.data?.message;
      } finally {
        this.isLoading = false;
      }
    },
    openAuth() {
      this.authIsOpen = !this.authIsOpen;
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

  persist: {
    key: 'user',
    paths: ['firstName', 'lastName', 'email', 'accessToken', 'id'],
  },
});
