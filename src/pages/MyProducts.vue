<template>
  <Container class="mt-3">
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
import Container from '../components/Container.vue';
import ProductList from '../components/product/ProductList.vue';
import ProductCard from '../components/product/ProductCard.vue';
import Spinner from '../components/Spinner.vue';
import { useGetAllProductsByUser } from '../api/product.queries';
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';

export default defineComponent({
  components: {
    Container,
    ProductList,
    ProductCard,
    Spinner,
  },
  setup() {
    const auth = useAuthStore();
    const { id } = storeToRefs(auth);
    const { data, isLoading } = useGetAllProductsByUser(Number(id.value));
    return { data, isLoading };
  },
});
</script>

<style scoped></style>
