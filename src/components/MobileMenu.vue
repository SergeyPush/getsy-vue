<template>
  <div
    class="backdrop"
    @click="closeMenu"
    :class="[isOpen && 'is-active']"
  ></div>
  <div class="menu" :class="[isOpen && 'is-active']">
    <div class="user" v-if="auth">
      <i class="fa fa-user-o user-icon" v-if="auth.firstName"></i>
      <span class="username">
        {{ auth.firstName }}
      </span>
    </div>
    <div class="controls">
      <router-link
        :to="{ name: 'my-products' }"
        class="link"
        v-if="auth.isAuthenticated"
        @click="closeMenu"
      >
        My products
      </router-link>
      <router-link
        :to="{ name: 'create' }"
        class="link"
        v-if="auth.isAuthenticated"
        @click="closeMenu"
      >
        Create
      </router-link>
      <button class="link" @click="login" v-if="!auth.isAuthenticated">
        Login
      </button>
      <button class="link" v-if="auth.isAuthenticated" @click="auth.signOut">
        Logout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '../store/auth.store';

export default defineComponent({
  emits: ['close', 'openDialog'],
  props: ['isOpen'],
  setup(_, context) {
    const auth = useAuthStore();

    const login = () => {
      closeMenu();
      context.emit('openDialog');
    };
    const logout = () => {
      closeMenu();
      context.emit('openDialog');
    };

    const closeMenu = () => {
      context.emit('close');
    };
    return { closeMenu, auth, login, logout };
  },
});
</script>

<style scoped lang="scss">
@import '../styles/mixins.scss';
@import '../styles/variables.scss';
.backdrop {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: transparent;
  transition: all 0.2s linear;
  display: none;
  &.is-active {
    background: rgba(0, 0, 0, 0.52);
    display: inherit;
  }
}
.menu {
  position: fixed;
  right: 0;
  top: 0;
  background-color: #fff;
  height: 100%;
  width: 100%;
  padding: 16px 20px;
  z-index: 20;
  display: none;
  transition: all 0.4s linear;
  @include tablet {
    max-width: 350px;
  }
  @include desktop {
    display: none;
  }
  &.is-active {
    display: block;
  }
}

.user {
  display: flex;
  align-items: center;
}
.user-icon {
  margin-right: 7px;
}
.controls {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.link {
  text-decoration: none;
  margin-bottom: 20px;
  font-size: 20px;
  color: $linkColor;
  background: none;
  border: none;
}
</style>
