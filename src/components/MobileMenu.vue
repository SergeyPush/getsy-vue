<template>
  <div
    class="backdrop"
    @click="closeMenu"
    :class="[isOpen && 'is-active']"
  ></div>
  <div class="menu" :class="[isOpen && 'is-active']">
    <p>Some content</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['close'],
  props: ['isOpen'],
  setup(_, context) {
    const closeMenu = () => {
      context.emit('close');
    };
    return { closeMenu };
  },
});
</script>

<style scoped lang="scss">
@import '../styles/mixins.scss';
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
</style>
