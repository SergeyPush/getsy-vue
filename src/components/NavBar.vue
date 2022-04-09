<template>
  <nav class="navbar">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="logo">Getsy</router-link>
      <div class="menu">
        <router-link :to="{ name: 'products' }" class="link"
          >Products</router-link
        >
        <router-link :to="{ name: 'services' }" class="link"
          >Services</router-link
        >
      </div>
      <div class="user">
        <Button label="Create" class="p-button-sm p-button-text" />
        <Button
          label="Log in"
          class="p-button-sm p-button-outlined p-button-text"
          @click="isDisplayed = !isDisplayed"
        />
      </div>
    </div>
    <Dialog v-model:visible="isDisplayed">
      <template #header>
        <h3>{{ hasAccount ? 'Sign Up' : 'Log In' }}</h3>
      </template>

      <Login v-if="hasAccount" @closeDialog="isDisplayed = false" />
      <SignUp v-if="!hasAccount" @closeDialog="isDisplayed = false" />

      <button class="button" @click="hasAccount = !hasAccount">
        {{ hasAccount ? "Don't have account? " : 'Already has an account?' }}
      </button>
    </Dialog>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Login from '../components/auth/Login.vue';
import SignUp from '../components/auth/SignUp.vue';

export default defineComponent({
  components: {
    Button,
    Dialog,
    Login,
    SignUp,
  },
  setup() {
    const isDisplayed = ref(false);
    const hasAccount = ref(true);

    return { isDisplayed, hasAccount };
  },
});
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';

$logoColor: var(--orange-500);
$borderColor: var(--teal-50);
$activeColor: var(--teal-500);
.navbar {
  border-bottom: 1px solid $borderColor;
  background-color: #fff;
  padding: 10px 0;
  margin-bottom: 10px;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 70%;
  margin-left: auto;
  margin-right: auto;
}

.link {
  text-decoration: none;
  font-weight: 600;
  color: $linkColor;
  margin: 0 20px;
  font-size: 15px;
}
.button {
  background-color: transparent;
  border: none;
  color: $activeLinkColor;
  padding: 0;
  cursor: pointer;
}
.router-link-active {
  text-decoration: underline;
}
.logo {
  font-weight: 600;
  font-size: 24px;
  color: $logoColor;
  text-decoration: none;
}
</style>
