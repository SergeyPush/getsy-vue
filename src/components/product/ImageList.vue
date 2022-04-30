<template>
  <ImageModal :image="selectedImage" @close="selectedImage = ''" />
  <div class="container">
    <div class="big-image">
      <Image :src="images[0]" @click="selectedImage = images[0]" />
    </div>
    <div class="image-list">
      <Image
        v-for="(img, key) in images.slice(1)"
        :key="key"
        :src="img"
        ratio="is-4by3"
        @click="selectedImage = img"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ImageModal from './ImageModal.vue';
import Image from './Image.vue';

export default defineComponent({
  components: {
    ImageModal,
    Image,
  },
  props: ['images'],
  setup({ images }) {
    const selectedImage = ref('');
    return { selectedImage };
  },
});
</script>

<style scoped>
.container {
  width: 100%;
}
.image-list {
  padding: 15px 0;
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
