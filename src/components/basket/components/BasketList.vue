<template>
  <div>
    <BasketItem v-for="(item, key) in data" :key="key" :item="item" />
  </div>
</template>

<script setup lang="ts">
import BasketItem from './BasketItem.vue';

const { data } = defineProps({
  data: Array,
});
</script>

<style scoped></style>
