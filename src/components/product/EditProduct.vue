<template>
  <Dialog
    :header="`Change ${data.type}`"
    v-model:visible="visible"
    :style="{ width: '50vw' }"
    :modal="true"
    :closable="false"
    v-if="formData"
  >
    <form class="form p-fluid" @submit.prevent="">
      <div class="field">
        <!-- <Message
          v-if="error"
          severity="error"
          v-for="(err, idx) of error"
          :key="idx"
          :closable="false"
        >
          {{ err }}
        </Message> -->
        <!-- {{ formData }} -->
      </div>
      <div class="field">
        <label for="title">Title</label>
        <InputText
          id="title"
          aria-describedby="title-help"
          class="p-inputtext-sm"
          v-model="formData.title"
        />
      </div>
      <div class="field">
        <label for="eritor">Description</label>
        <Editor
          v-model="formData.description"
          editorStyle="height: 140px"
          id="editor"
        />
      </div>
      <div class="field">
        <label for="chips">Features</label>
        <Chips v-model="formData.features" class="p-inputtext-sm" id="chips" />
      </div>
      <div class="column">
        <div class="field col-12 md:col-3">
          <label for="locale-us">Price</label>
          <InputNumber
            id="locale-us"
            v-model="formData.price"
            mode="decimal"
            locale="en-US"
            autocomplete="off"
            :minFractionDigits="2"
            class="p-inputtext-sm"
          />
        </div>
        <div class="field col-12 md:col-3" v-if="formData.type === 'product'">
          <label for="quantity">Available quantity</label>
          <InputNumber
            id="quantity"
            v-model="formData.quantity"
            mode="decimal"
            autocomplete="off"
            class="p-inputtext-sm"
          />
        </div>
      </div>
    </form>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="closeDialog"
        class="p-button-text p-button-sm"
      />
      <Button
        label="Update"
        icon="pi pi-check"
        @click="updateProduct"
        autofocus
        class="p-button-sm"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Editor from 'primevue/editor';
import Chips from 'primevue/chips';
import { useUpdateProduct } from '../../api/product.queries';
import { QueryClient, useQueryClient } from 'vue-query';

export default defineComponent({
  components: {
    Dialog,
    Button,
    Dropdown,
    InputNumber,
    InputText,
    Editor,
    Chips,
  },
  props: ['visible', 'data'],
  setup(props, { emit }) {
    const { data } = toRefs(props);
    const formData = reactive({ ...data.value });
    const closeDialog = () => {
      emit('closeDialog');
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
    return { closeDialog, data, updateProduct, formData };
  },
});
</script>

<style scoped lang="scss">
.field {
  margin-bottom: 12px;
}
</style>
