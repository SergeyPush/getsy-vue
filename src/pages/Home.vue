<template>
  <div>Home</div>
  <div>
    {{ auth }}
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useMainStore } from '../store/store';

export default defineComponent({
  setup() {
    const store = useMainStore();
    const { auth } = storeToRefs(store);
    return { auth };
  },
});
</script>

<style scoped></style>
