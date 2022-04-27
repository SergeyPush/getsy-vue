<template>
  <nav class="navbar">
    <MobileMenu
      :isOpen="mobileMenuIsOpen"
      @close="mobileMenuIsOpen = !mobileMenuIsOpen"
      @openDialog="isDisplayed = !isDisplayed"
    />
    <Container>
      <div class="wrapper">
        <router-link :to="{ name: 'home' }" class="logo">Getsy</router-link>

        <div class="user">
          <i class="fa fa-user-o user-icon" v-if="auth.firstName"></i>
          <p class="username">
            {{ auth.firstName }}
          </p>

          <router-link
            :to="{ name: 'my-products' }"
            class="link"
            v-if="auth.isAuthenticated"
          >
            My products</router-link
          >
          <router-link
            :to="{ name: 'create' }"
            class="link"
            v-if="auth.isAuthenticated"
            >Create</router-link
          >
          <button
            class="button is-primary is-inverted"
            @click="isDisplayed = !isDisplayed"
            v-if="!auth.isAuthenticated"
          >
            Login
          </button>
          <button
            class="button is-primary is-inverted"
            v-if="auth.isAuthenticated"
            @click="auth.signOut"
          >
            Logout
          </button>
        </div>
        <button
          class="hamburger hamburger--elastic mobile-button"
          :class="[mobileMenuIsOpen && 'is-active']"
          type="button"
          @click="mobileMenuIsOpen = !mobileMenuIsOpen"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </Container>
    <div class="modal" :class="[isDisplayed && 'is-active']">
      <div class="modal-background"></div>
      <div class="modal-content custom-modal">
        <div class="box">
          <h3 class="subtitle has-text-centered">
            {{ hasAccount ? 'Log In' : 'Sign Up' }}
          </h3>
          <Login v-if="hasAccount" @closeDialog="isDisplayed = false" />
          <SignUp v-if="!hasAccount" @closeDialog="isDisplayed = false" />
          <button class="button is-ghost" @click="hasAccount = !hasAccount">
            {{
              hasAccount ? "Don't have account? " : 'Already has an account?'
            }}
          </button>
        </div>
      </div>
      <button
        class="modal-close is-large"
        @click="isDisplayed = false"
        aria-label="close"
      ></button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Login from '../components/auth/Login.vue';
import SignUp from '../components/auth/SignUp.vue';
import { useAuthStore } from '../store/auth';
import Container from './Container.vue';
import MobileMenu from './MobileMenu.vue';
export default defineComponent({
  components: {
    Login,
    SignUp,
    Container,
    MobileMenu,
  },
  setup() {
    const isDisplayed = ref(false);
    const hasAccount = ref(true);
    const mobileMenuIsOpen = ref(false);
    const auth = useAuthStore();

    return { isDisplayed, hasAccount, auth, mobileMenuIsOpen };
  },
});
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';
@import '../styles/mixins.scss';
@import '../styles/hamburger.scss';

.navbar {
  border-bottom: 1px solid $borderColor;
  background-color: $navBarBackgroundColor;
  padding: 10px 0;
  margin-bottom: 20px;
}
.wrapper {
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
  /* margin-left: auto; */
  display: flex;
  align-items: center;
  display: none;
  @include desktop {
    display: inherit;
  }
}
.user-icon {
  margin-right: 10px;
}
.username {
  margin-right: 20px;
}
.link {
  text-decoration: none;
  color: $linkColor;
  margin: 0 20px;
  font-size: 15px;
}
.router-link-active {
  color: $activeLinkColor;
  text-decoration: underline;
}
.button {
  text-decoration: none;
  outline: none;
}
.logo {
  font-weight: 600;
  font-size: 24px;
  color: $logoColor;
  text-decoration: none;
}
.custom-modal {
  max-width: 380px;
}
.mobile-button {
  z-index: 30;
  @include desktop {
    display: none;
  }
}
</style>
