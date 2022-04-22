<template>
  <Container>
    <Spinner :isLoading="isLoading" />
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
import Spinner from '../components/Spinner.vue';

export default defineComponent({
  components: { Container, ProductCard, ProductList, Spinner },
  setup() {
    const { data, error, isLoading } = useGetAllProducts();

    return { data, error, isLoading };
  },
});
</script>

<style scoped lang="scss"></style>
