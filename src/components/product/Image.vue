<template>
  <img :src="getImage(src)" :alt="alt" class="image img" v-if="src" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getImage } from '../../helpers/image.helpers';

export default defineComponent({
  props: ['src', 'alt', 'ratio'],
  setup() {
    return { getImage };
  },
});
</script>

<style scoped lang="scss">
.img {
  object-fit: cover;
  height: 100%;
  cursor: pointer;
}
</style>
