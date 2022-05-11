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
          <NavControls />
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
            @click="auth.openAuth()"
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
    <AuthModal />
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useAuthStore } from '../store/auth.store';
import Container from './Container.vue';
import MobileMenu from './MobileMenu.vue';
import NavControls from './NavControls.vue';
import AuthModal from './auth/AuthModal.vue';

export default defineComponent({
  components: {
    Container,
    MobileMenu,
    NavControls,
    AuthModal,
  },
  setup() {
    const isDisplayed = ref(false);
    const hasAccount = ref(true);
    const mobileMenuIsOpen = ref(false);
    const auth = useAuthStore();

    return {
      isDisplayed,
      hasAccount,
      auth,
      mobileMenuIsOpen,
    };
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
  display: flex;
  align-items: center;
  display: none;
  @include desktop {
    display: inherit;
  }
}
.icon {
  color: inherit;
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
  font-size: 15px;
  text-decoration: none;
  outline: none;
}
.logo {
  font-weight: 600;
  font-size: 24px;
  color: $logoColor;
  text-decoration: none;
}

.mobile-button {
  z-index: 30;
  @include desktop {
    display: none;
  }
}
</style>
