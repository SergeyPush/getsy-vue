<template>
  <div class="grid">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import '../../styles/mixins.scss';
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  @include tablet {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    gap: 20px;
  }
  @include desktop {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
    gap: 40px;
  }
}
</style>
