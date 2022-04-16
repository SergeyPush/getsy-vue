<template>
  <Container>
    <ProductList>
      <ProductCard
        v-for="product of data"
        :key="product.id"
        :product="product"
      />
    </ProductList>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Container from '../components/Container.vue';
import { useGetAllProducts } from '../api/product.queries';
import ProductCard from '../components/product/ProductCard.vue';
import ProductList from '../components/product/ProductList.vue';

export default defineComponent({
  setup() {
    const { data, error } = useGetAllProducts();

    return { data, error };
  },
  components: { Container, ProductCard, ProductList },
});
</script>

<style scoped lang="scss"></style>
