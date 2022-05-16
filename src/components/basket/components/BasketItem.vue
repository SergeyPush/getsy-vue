<template>
  <div class="basket-item mb-4">
    <Image :src="product?.images[0]" class="image mr-3" v-if="product.images" />
    <span>{{ product.title }}</span>
    <span class="item-price">${{ product.price }}</span>
    <CloseIcon
      class="close-icon ml-3"
      @click="basket.removeFromBasket(product)"
    />
  </div>
</template>

<script setup lang="ts">
import { ProductInterface } from '../../../types/product.interface';
import { CloseIcon } from '@iconicicons/vue3';
import Image from '../../product/Image.vue';
import { useBasketStore } from '../../../store/basket.store';
const { item } = defineProps(['item']);

const basket = useBasketStore();
const product = item as ProductInterface;
</script>

<style scoped lang="scss">
.basket-item {
  display: flex;
  align-items: center;
  width: 100%;
}
.image {
  width: 100px;
  max-height: 80px;
  border-radius: 5px;
}
.item-price {
  margin-left: auto;
}
.close-icon {
  cursor: pointer;
}
</style>
