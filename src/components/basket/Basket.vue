<template>
  <transition name="fade">
    <div class="backdrop" @click="basket.closeBasket" v-if="isOpen"></div>
  </transition>
  <transition name="slide">
    <div class="wrapper" v-if="isOpen">
      <div class="header">
        <span class="basket-title">Basket</span>
        <CloseIcon class="close-icon" @click="closeBasket" />
      </div>
      <BasketList :data="getBasket" v-if="basketHasProducts" />
      <Transition mode="out-in" name="fade">
        <p v-if="!basketHasProducts" class="has-text-centered is-size-4 m-auto">
          Basket is empty, try to buy something
        </p>
      </Transition>
      <div class="bottom">
        <p class="mb-3">Total price: {{ getTotal }}</p>
        <button class="button is-info" @click="handleBuyButton">Buy</button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBasketStore } from '../../store/basket.store';
import { CloseIcon } from '@iconicicons/vue3';
import BasketList from './components/BasketList.vue';
import { useAuthStore } from '../../store/auth.store';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth);
const basket = useBasketStore();
const { getBasket, getTotal, basketHasProducts, isOpen } = storeToRefs(basket);
const router = useRouter();

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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
