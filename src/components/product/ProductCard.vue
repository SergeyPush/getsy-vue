<template>
  <router-link :to="{ name: 'product', params: { id: product.id } }">
    <Card class="card">
      <template #header> </template>
      <template #title> {{ product.title }} </template>
      <template #content>
        <p class="text" v-html="product.description" />
      </template>
    </Card>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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

<style scoped lang="scss">
.card {
  height: 100%;
}
.text {
  background-color: transparent;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
