<template>
  <NavBar />
  <router-view :key="$route.path" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue';

export default defineComponent({
  components: { NavBar },
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
}
body,
p,
time {
  color: #475569;
}
</style>
