<template>
  <Container>
    <h1 class="subtitle is-3 mt-5">Selected products</h1>
    <div class="confirmation-wrapper">
      <div class="products">
        <ConfirmationList :data="getBasket" />
        <h2 class="subtitle has-text-right is-4">
          Total price: {{ getTotal }}
        </h2>
        <button class="button is-large is-link">Purchase</button>
      </div>
      <div class="status">
        <img src="confirmation4.svg" class="conf-image" />
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from '../components/Container.vue';
import ConfirmationList from '../components/confirmation/ConfirmationList.vue';
import { useBasketStore } from '../store/basket.store';
import { storeToRefs } from 'pinia';

const basket = useBasketStore();
const { getBasket, getTotal, basketHasProducts } = storeToRefs(basket);
</script>

<style scoped lang="scss">
@import './../styles/mixins.scss';
.confirmation-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.products {
  padding-top: 20px;
  width: 100%;
  @include tablet {
    width: 55%;
  }
}
.status {
  display: none;
  align-items: flex-start;
  justify-content: center;
  @include tablet {
    display: flex;
    width: 40%;
  }
}
.button {
  display: block;
  margin-left: auto;
}

.conf-image {
  width: 80%;
}
</style>
