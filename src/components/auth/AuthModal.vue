<template>
  <div class="modal" :class="[isAuthOpen && 'is-active']" v-if="isAuthOpen">
    <div class="modal-background"></div>
    <div class="modal-content custom-modal">
      <div class="box">
        <h3 class="subtitle has-text-centered">
          {{ hasAccount ? 'Log In' : 'Sign Up' }}
        </h3>
        <Login v-if="hasAccount" @closeDialog="auth.openAuth" />
        <SignUp v-if="!hasAccount" @closeDialog="isDisplayed = false" />
        <button class="button is-ghost" @click="hasAccount = !hasAccount">
          {{ hasAccount ? "Don't have account? " : 'Already has an account?' }}
        </button>
      </div>
    </div>
    <button
      class="modal-close is-large"
      @click="auth.openAuth"
      aria-label="close"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../store/auth.store';
import { storeToRefs } from 'pinia';
import Login from './Login.vue';
import SignUp from './SignUp.vue';
const isDisplayed = ref(false);
const hasAccount = ref(true);
const mobileMenuIsOpen = ref(false);
const auth = useAuthStore();
const { isAuthOpen } = storeToRefs(auth);
</script>

<style scoped lang="scss">
.custom-modal {
  max-width: 380px;
}
</style>
