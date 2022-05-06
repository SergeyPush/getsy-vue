<template>
  <Container class="mt-3">
    <h1 class="subtitle is-3 mt-5">Your favorites</h1>
    <Spinner :isLoading="isLoading" />
    <EmptyProduct v-if="!hasFavorites" text="No favorites" />
    <ProductList v-if="hasFavorites">
      <ProductCard
        :showFavorites="true"
        v-for="product of data"
        :key="product.id"
        :product="product"
      />
    </ProductList>
  </Container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Container from '../components/Container.vue';
import { useFavoritesStore } from '../store/favorites';
import Spinner from '../components/Spinner.vue';
import ProductList from '../components/product/ProductList.vue';
import ProductCard from '../components/product/ProductCard.vue';
import { useFetchFavorites } from '../composables/useFetchFavorites';
import { onMounted, watch } from 'vue';
import EmptyProduct from '../components/product/EmptyProduct.vue';

const favs = useFavoritesStore();
const { favorites, hasFavorites } = storeToRefs(favs);

const { data, isLoading, fetchData } = useFetchFavorites();
onMounted(() => fetchData(favorites.value));
watch(favorites, () => fetchData(favorites.value));
</script>

<style scoped lang="scss"></style>
