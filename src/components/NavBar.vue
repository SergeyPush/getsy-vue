<template>
  <nav class="navbar">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="logo">Getsy</router-link>
      <div class="menu">
        <router-link :to="{ name: 'services' }" class="link"
          >Services</router-link
        >
        <router-link :to="{ name: 'products' }" class="link"
          >Products</router-link
        >
      </div>
      <div class="user">
        <Button label="Create" class="p-button-sm p-button-text" />
        <Button
          label="Log in"
          class="p-button-sm p-button-outlined p-button-text"
        />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';

export default defineComponent({
  components: {
    Button,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';

$logoColor: var(--orange-500);
$borderColor: var(--teal-50);
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
.router-link-active {
  text-decoration: underline;
}
.logo {
  font-weight: 800;
  font-size: 24px;
  color: $logoColor;
  text-decoration: none;
}
</style>
