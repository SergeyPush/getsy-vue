<template>
  <div v-if="isOpen">
    <div class="backdrop" @click="basket.closeBasket"></div>
    <div
      class="wrapper"
      v-motion
      :initial="variant.initial"
      :enter="variant.enter"
      :leave="variant.leave"
    >
      <div class="header">
        <span class="basket-title">Basket</span>
        <CloseIcon class="close-icon" @click="closeBasket" />
      </div>
      <BasketList :data="getBasket" v-if="basketHasProducts" />
      <p v-if="!basketHasProducts">Basket is empty, try to buy something</p>
      <div class="bottom">
        <p class="mb-3">Total price: {{ getTotal }}</p>
        <button class="button is-info" @click="handleBuyButton">Buy</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBasketStore } from '../../store/basket.store';
import { CloseIcon } from '@iconicicons/vue3';
import BasketList from './components/BasketList.vue';
import { useAuthStore } from '../../store/auth.store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const basket = useBasketStore();
const auth = useAuthStore();
const { getBasket, getTotal, basketHasProducts, isOpen } = storeToRefs(basket);
const { isAuthenticated } = storeToRefs(auth);
const router = useRouter();

const variant = ref({
  initial: {
    opacity: 0,
    x: 200,
  },
  enter: {
    opacity: 1,
    x: 0,
  },
  leave: {
    opacity: 0,
    x: 200,
  },
});
const closeBasket = () => {
  basket.closeBasket();
};

const handleBuyButton = () => {
  closeBasket();
  if (isAuthenticated.value) {
    router.push({ name: 'confirmation' });
  } else {
    auth.openAuth();
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/mixins.scss';

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
  width: 100%;
  background-color: #fff;
  z-index: 32;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  @include tablet {
    width: inherit;
    min-width: 500px;
  }
}
.basket-title {
  font-size: 20px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
.bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
}
.close-icon {
  cursor: pointer;
}
</style>
