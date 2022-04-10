<template>
  <Card>
    <template #header> </template>
    <template #title> {{ product.title }} </template>
    <template #content>
      <span v-html="product.description" />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, defineProps } from 'vue';
import Card from 'primevue/card';

export default defineComponent({
  props: ['product'],
  components: {
    Card,
  },
  setup({ product }) {
    return {
      product,
    };
  },
});
</script>

<style scoped></style>
