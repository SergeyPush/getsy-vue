<template>
  <div class="modal" :class="[visible && 'is-active']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button class="delete" aria-label="close" @click="closeDialog"></button>
      </header>
      <section class="modal-card-body">
        {{ formData }}
        <div class="field">
          <label for="title">Title</label>
          <input
            class="input is-primary"
            id="title"
            type="text"
            placeholder="Enter title"
            v-model="formData.title"
          />
        </div>
        <div class="field">
          <label for="eritor">Description</label>
          <textarea
            class="textarea is-primary"
            placeholder="Enter description"
            v-model="formData.description"
            id="editor"
          ></textarea>
        </div>
        <div class="field">
          <label for="chips">Features</label>
          <input
            class="input is-primary"
            id="chips"
            type="text"
            placeholder="Enter features"
            v-model="formData.features"
          />
        </div>
        <div class="columns">
          <div class="column">
            <label for="price">Price</label>
            <input
              class="input is-primary"
              id="price"
              type="text"
              placeholder="Enter price"
              v-model="formData.price"
            />
          </div>
          <div class="column" v-if="formData.type === 'product'">
            <label for="quantity">Available quantity</label>
            <input
              class="input is-primary"
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              v-model="formData.quantity"
            />
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="updateProduct">
          Save changes
        </button>
        <button class="button" @click="closeDialog">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useUpdateProduct } from '../../api/product.queries';
import { useQueryClient } from 'vue-query';

export default defineComponent({
  props: ['data', 'visible'],

  setup(props, context) {
    const { data } = toRefs(props);
    const formData = reactive({ ...data.value });

    const closeDialog = () => {
      context.emit('close');
    };
    const { mutateAsync, isSuccess } = useUpdateProduct();
    const client = useQueryClient();

    const updateProduct = async () => {
      await mutateAsync(formData, {
        onSuccess: () => {
          client.invalidateQueries('product');
        },
      });
      if (isSuccess) {
        closeDialog();
      }
    };
    return {
      formData,
      closeDialog,
      updateProduct,
    };
  },
});
</script>

<style scoped></style>
