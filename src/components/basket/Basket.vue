<template>
  <div class="backdrop"></div>
  <div class="wrapper">Basket</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.backdrop {
  position: fixed;
  width: 100%;
  bottom: 0;
  top: 0;
  z-index: 31;
  background-color: rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow: hidden;
}
.wrapper {
  position: fixed;
  right: 0;
  height: 100%;
  min-width: 500px;
  background-color: #fff;
  z-index: 32;
  overflow: hidden;
}
</style>
