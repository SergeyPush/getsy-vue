<template>
  <Container>
    <h1 class="title is-1 has-text-centered mt-5">404</h1>
    <p class="subtitle is-3 has-text-centered">
      Page youa are looking for is not found
    </p>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Container from '../components/Container.vue';

export default defineComponent({
  setup() {
    return {};
  },
  components: { Container },
});
</script>

<style scoped></style>
