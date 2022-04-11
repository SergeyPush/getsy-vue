<template>
  <Container>
    <ProductList>
      <ProductCard
        v-if="data"
        v-for="product of data"
        :key="product.id"
        :product="product"
      />
    </ProductList>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useGetAllProducts } from '../api/product.queries';
import Container from '../components/Container.vue';
import ProductList from '../components/product/ProductList.vue';
import ProductCard from '../components/product/ProductCard.vue';
export default defineComponent({
  components: {
    Container,
    ProductCard,
    ProductList,
  },
  setup() {
    const { data } = useGetAllProducts('service');
    return { data };
  },
});
</script>

<style scoped></style>
