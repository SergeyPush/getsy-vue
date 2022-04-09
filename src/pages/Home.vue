<template>
  <Container>
    <div class="grid">
      <div class="col-4">1</div>
      <div class="col-4">2</div>
      <div class="col-4">3</div>
      <div class="col-4">4</div>
    </div>
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
