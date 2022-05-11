<template>
  <router-link :to="{ name: 'product', params: { id: product.id } }">
    <div class="card" v-motion-slide-bottom>
      <div class="card-image">
        <div
          v-if="showFavorites"
          class="favorite-pad"
          :class="[isFavorite(product.id) && 'displayed']"
          @click.prevent="add"
        >
          <i
            class="fa favorite"
            :class="[
              isFavorite(product.id) ? 'fa-heart selected' : 'fa-heart-o',
            ]"
          ></i>
        </div>
        <figure class="image is-4by3">
          <img
            v-if="product.images.length === 0"
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
          <Image
            v-if="product.images.length > 0"
            :src="product.images[0]"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <p class="subtitle is-4">{{ product.title }}</p>
        </div>
        <div class="content">
          <p class="text">
            {{ product.description }}
          </p>
          <time class="time">{{ time }}</time>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from 'primevue/card';
import Image from './Image.vue';
import { computed } from '@vue/reactivity';
import { getDate } from '../../helpers/date.helpers';
import { useFavoritesStore } from '../../store/favorites.store';
import { storeToRefs } from 'pinia';

export default defineComponent({
  props: ['product', 'showFavorites'],
  components: {
    Card,
    Image,
  },
  setup({ product }) {
    const time = computed(() => getDate(product.createdAt));
    const favorites = useFavoritesStore();
    const { isFavorite } = storeToRefs(favorites);

    const add = () => {
      favorites.addToFavorites(product.id);
    };
    return {
      product,
      time,
      add,
      isFavorite,
    };
  },
});
</script>

<style scoped lang="scss">
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0.2em 0.6em 1.2em -0.125em rgba(10, 10, 10, 0.1),
      0 0 0 1px rgba(10, 10, 10, 0.02);
    box-shadow: 0px 0px 15px 9px rgba(34, 60, 80, 0.2);
  }
}
.text {
  background-color: transparent;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.card-content {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.time {
  margin-top: auto;
  font-size: 12px;
}
.favorite-pad {
  display: flex;
  opacity: 0;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: absolute;
  background-color: #fff;
  padding: 6px;
  top: 15px;
  right: 15px;
  border-radius: 50%;
  border: 1px solid gainsboro;
  transition: all 0.2s linear;
  &:hover {
    box-shadow: 0px 0px 8px 2px rgba(34, 60, 80, 0.3);
  }
}
.card:hover .favorite-pad {
  opacity: 1;
}
.favorite {
  font-size: 20px;
  color: black;
}
.selected {
  color: tomato;
}
.displayed {
  opacity: 1;
}
</style>
