<template>
  <nav class="navbar">
    <Container>
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
          <i class="pi pi-user icon"></i>
          <p class="username">
            {{ auth.firstName }}
          </p>

          <router-link
            :to="{ name: 'create' }"
            class="link"
            v-if="auth.isAuthenticated"
            >Create</router-link
          >
          <Button
            label="Log in"
            class="p-button-sm p-button-outlined p-button-text"
            @click="isDisplayed = !isDisplayed"
            v-if="!auth.isAuthenticated"
          />
          <Button
            label="Logout"
            class="p-button-sm p-button-outlined p-button-text"
            @click="auth.signOut"
            v-if="auth.isAuthenticated"
          />
        </div>
      </div>
    </Container>
    <Dialog v-model:visible="isDisplayed">
      <template #header>
        <h3>{{ hasAccount ? 'Log In' : 'Sign Up' }}</h3>
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
import { useAuthStore } from '../store/auth';
import Container from './Container.vue';
export default defineComponent({
  components: {
    Button,
    Dialog,
    Login,
    SignUp,
    Container,
  },
  setup() {
    const isDisplayed = ref(false);
    const hasAccount = ref(true);
    const auth = useAuthStore();

    return { isDisplayed, hasAccount, auth };
  },
});
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

$logoColor: var(--orange-500);
$borderColor: var(--teal-50);
$activeColor: var(--teal-500);
$usernameColor: var(--bluegray-500);
$navBarBackgroundColor: #fff;
.navbar {
  border-bottom: 1px solid $borderColor;
  background-color: $navBarBackgroundColor;
  padding: 10px 0;
  margin-bottom: 10px;
}
.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.menu {
  display: none;
  @include tablet {
    display: block;
  }
}
.user {
  display: flex;
  align-items: center;
}
.icon {
  color: $usernameColor;
  margin-right: 10px;
}
.username {
  margin-right: 20px;
  color: $usernameColor;
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
