<template>
  <router-link :to="{ name: 'product', params: { id: product.id } }">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="subtitle is-4">{{ product.title }}</p>
          </div>
        </div>
        <div class="content">
          <p class="text">
            {{ product.description }}
          </p>
          <time datetime="2016-1-1" class="time">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from 'primevue/card';

export default defineComponent({
  props: ['product'],
  components: {
    Card,
  },
  setup({ product }) {
    return {
      product,
    };
  },
});
</script>

<style scoped lang="scss">
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
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
</style>
