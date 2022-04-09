<template>
  <Container>
    <form class="form p-fluid" @submit.prevent="onFormSubmit">
      <div class="field">
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
        <label for="title">Description</label>
        <Editor v-model="formData.description" editorStyle="height: 320px" />
      </div>
      <div class="field">
        <label for="title">Features</label>
        <Chips v-model="formData.features" class="p-inputtext-sm" />
      </div>

      <div class="field col-12 md:col-3">
        <label for="locale-us">United States Locale</label>
        <InputNumber
          id="locale-us"
          v-model="formData.price"
          mode="decimal"
          locale="en-US"
          :minFractionDigits="2"
          class="p-inputtext-sm"
        />
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
export default defineComponent({
  components: {
    Container,
    Dropdown,
    InputText,
    Button,
    Editor,
    Chips,
    InputNumber,
  },

  setup() {
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
    });

    const onFormSubmit = () => {
      console.log(formData);
    };
    return {
      productTypes,
      formData,
      onFormSubmit,
    };
  },
});
</script>

<style scoped lang="scss">
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
