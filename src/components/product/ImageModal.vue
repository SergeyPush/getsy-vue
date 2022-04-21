<template>
  <div class="modal" :class="[image && 'is-active']" v-if="image">
    <div class="modal-background"></div>
    <div class="modal-content">
      <p class="image is-4by3">
        <img :src="getImage(image)" :alt="alt" />
      </p>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="closeModal"
    ></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getImage } from '../../helpers/image.helpers';

export default defineComponent({
  props: ['image', 'alt'],
  setup(_, context) {
    const closeModal = () => {
      context.emit('close');
    };
    return { getImage, closeModal };
  },
});
</script>

<style scoped></style>
