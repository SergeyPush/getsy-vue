<template>
  <Container>
    <form class="form p-fluid" @submit.prevent="onFormSubmit">
      {{ data }}
      <div class="field">
        <Message
          v-if="error"
          severity="error"
          v-for="(err, idx) of error"
          :key="idx"
          :closable="false"
        >
          {{ err }}
        </Message>
        <label for="title">Product type</label>
        <Dropdown
          v-model="formData.type"
          :options="productTypes"
          optionLabel="name"
          optionValue="value"
          placeholder="Select Type"
          class="p-inputtext-sm"
        />
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
          editorStyle="height: 320px"
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
      <Button type="submit" label="Create Product" class="p-button-sm button" />
    </form>
  </Container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import Container from '../components/Container.vue';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Editor from 'primevue/editor';
import Chips from 'primevue/chips';
import Message from 'primevue/message';

import { useCreateProduct } from '../api/product.queries';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    Container,
    Dropdown,
    InputText,
    Button,
    Editor,
    Chips,
    InputNumber,
    Message,
  },

  setup() {
    const router = useRouter();
    const productTypes = ref([
      { name: 'Product', value: 'product' },
      { name: 'Service', value: 'service' },
    ]);
    const formData = reactive({
      type: '',
      title: '',
      description: '',
      features: undefined,
      price: null,
      quantity: 1,
    });

    const { error, data, isSuccess, mutateAsync } = useCreateProduct();
    const onFormSubmit = async () => {
      await mutateAsync(formData);
      if (isSuccess.value) {
        router.push('/');
      }
    };

    return {
      productTypes,
      formData,
      onFormSubmit,
      data,
      error,
    };
  },
});
</script>

<style scoped lang="scss">
.column {
  display: flex;
}
.column > div {
  margin-right: 30px;
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.button {
  display: block;
  margin-left: auto;
}
</style>
