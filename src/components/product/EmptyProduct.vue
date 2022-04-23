<template>
  <p class="subtitle is-3 text has-text-centered">{{ text }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['text'],
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.text {
  color: #94a3b8;
}
</style>
