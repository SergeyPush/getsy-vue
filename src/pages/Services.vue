<template>
  <Container>
    <Spinner :isLoading="isLoading" />
    <EmptyProduct text="There is no services to display" v-if="!data.length" />
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
import EmptyProduct from '../components/product/EmptyProduct.vue';
export default defineComponent({
  components: {
    Container,
    ProductCard,
    ProductList,
    Spinner,
    EmptyProduct,
  },
  setup() {
    const { data, isLoading } = useGetAllProducts('service');
    return { data, isLoading };
  },
});
</script>

<style scoped></style>
