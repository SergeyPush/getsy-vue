<template>
  <i
    v-if="hasFavorites"
    class="fa favorite fa-heart-o user-icon"
    @click="$router.push('/favorites')"
  ></i>

  <div class="cart" @click="openCart" v-if="basketHasProducts">
    <Icon icon="clarity:shopping-bag-line" class="custom-icon user-icon" />
    <span>{{ basketLength }}</span>
  </div>

  <div v-if="auth.firstName">
    <i class="fa fa-user-o user-icon"></i>
    <span class="username">
      {{ auth.firstName }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '../store/favorites.store';
import { storeToRefs } from 'pinia';
import { useBasketStore } from '../store/basket.store';
import { Icon } from '@iconify/vue';
import { useAuthStore } from '../store/auth.store';

const auth = useAuthStore();
const favorites = useFavoritesStore();
const { hasFavorites } = storeToRefs(favorites);
const basket = useBasketStore();
const { basketLength, basketHasProducts } = storeToRefs(basket);

const openCart = () => {
  basket.openBasket();
};
</script>

<style scoped lang="scss">
.user-icon {
  cursor: pointer;
  margin-right: 5px;
}
.custom-icon {
  font-size: 19px;
  margin-bottom: 2px;
}
.favorite {
  margin-right: 30px;
}
.cart {
  display: flex;
  align-items: center;
  margin-right: 24px;
  cursor: pointer;
}

.username {
  margin-right: 20px;
}
</style>
