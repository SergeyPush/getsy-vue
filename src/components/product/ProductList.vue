<template>
  <div class="grid">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 40px;
}
</style>
