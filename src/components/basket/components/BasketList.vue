<template>
  <TransitionGroup name="basket">
    <BasketItem v-for="(item, key) in data" :key="key" :item="item" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import BasketItem from './BasketItem.vue';

const { data } = defineProps({
  data: Array,
});
</script>

<style scoped lang="scss">
.basket-enter-active,
.basket-leave-active {
  transition: all 0.5s ease;
}
.basket-enter-from,
.basket-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
