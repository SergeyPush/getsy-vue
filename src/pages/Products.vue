<template>
  <Container>
    <Spinner :isLoading="isLoading" />
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
import Spinner from '../components/Spinner.vue';

export default defineComponent({
  components: {
    Container,
    ProductList,
    ProductCard,
    Spinner,
  },
  setup() {
    const { data, isLoading } = useGetAllProducts('product');

    return { data, isLoading };
  },
});
</script>

<style scoped></style>
