<template>
  <div class="modal" :class="[displayModal && 'is-active']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete item</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">Dou you want to delete item?</section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button is-danger" @click="deleteProduct">Delete</button>
        <button class="button" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['displayModal', 'delete'],
  setup(_, context) {
    const closeModal = () => {
      context.emit('close', false);
    };
    const deleteProduct = () => {
      context.emit('delete');
    };
    return { closeModal, deleteProduct };
  },
});
</script>

<style scoped lang="scss"></style>
