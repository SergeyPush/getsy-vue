<template>
  <div>
    <ProductSelector v-model:selected="selectedType" @changeType="changeType" />
    <Container>
      <Spinner :isLoading="isLoading" />
      <ProductList>
        <ProductCard
          :showFavorites="true"
          v-for="product of data"
          :key="product.id"
          :product="product"
        />
      </ProductList>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Container from '../components/Container.vue';
import ProductCard from '../components/product/ProductCard.vue';
import ProductList from '../components/product/ProductList.vue';
import Spinner from '../components/Spinner.vue';
import ProductSelector from '../components/product/ProductSelector.vue';
import { useFetch } from '../composables/useFetch';

export default defineComponent({
  components: { Container, ProductCard, ProductList, Spinner, ProductSelector },
  setup() {
    const selectedType = ref('');
    const { data, isLoading, fetchData } = useFetch();

    onMounted(() => fetchData());
    const changeType = (type: 'product' | 'service') => {
      selectedType.value = type;
      fetchData(type);
    };

    return { data, selectedType, isLoading, changeType };
  },
});
</script>

<style scoped lang="scss"></style>
