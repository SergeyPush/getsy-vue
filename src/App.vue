<template>
  <Basket />
  <NavBar />
  <router-view :key="$route.path" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue';
import Basket from './components/basket/Basket.vue';

export default defineComponent({
  components: { NavBar, Basket },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import 'bulma/css/bulma.min.css';

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eff4f8;
  font-size: 16px;
  overflow: hidden;
}
body,
p,
time {
  color: #475569;
}
</style>
