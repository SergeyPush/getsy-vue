<template>
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import '../styles/mixins.scss';
.container {
  padding-left: 20px;
  padding-right: 20px;

  @include desktop {
    padding: 0;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
