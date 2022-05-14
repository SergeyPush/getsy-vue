<template>
  <div class="product-item mb-5">
    <Image :src="product?.images[0]" class="image mr-3" v-if="product.images" />
    <span class="item-title">{{ product.title }}</span>
    <span class="item-price">${{ product.price }}</span>
    <CloseIcon
      class="close-icon ml-3"
      @click="basket.removeFromBasket(product)"
    />
  </div>
</template>

<script setup lang="ts">
import { useBasketStore } from '../../store/basket.store';
import { ProductInterface } from '../../types/product.interface';
import Image from '../product/Image.vue';
import { CloseIcon } from '@iconicicons/vue3';
const { item } = defineProps(['item']);

const basket = useBasketStore();
const product = item as ProductInterface;
</script>

<style scoped lang="scss">
.product-item {
  display: flex;
  align-items: center;
  width: 100%;
}
.image {
  /* width: 120px; */
  /* max-height: 100px; */
  max-height: 100px;
  width: 140px;
  border-radius: 5px;
}
.item-title {
  font-size: 20px;
}
.item-price {
  font-size: 20px;
  margin-left: auto;
}
.close-icon {
  cursor: pointer;
}
</style>
