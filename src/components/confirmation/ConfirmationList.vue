<template>
  <TransitionGroup name="list">
    <ConfirmationItem v-for="(item, key) in data" :key="key" :item="item" />
  </TransitionGroup>
</template>

<script setup lang="ts">
import ConfirmationItem from './ConfirmationItem.vue';
const { data } = defineProps(['data']);
</script>

<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
