<template>
  <Container>
    <div class="columns">
      <div class="column">
        <form @submit.prevent="onFormSubmit" class="form">
          <div class="file has-name is-boxed mb-4 is-primary">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="images"
                multiple
                @change="onFileUpload($event)"
              />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label"> Choose a file… </span>
              </span>
              <span
                class="file-name"
                v-for="(file, idx) in fileList"
                :key="idx"
              >
                {{ file }}
              </span>
            </label>
          </div>
          <div class="field">
            <label>Select type</label>
            <div class="select is-primary">
              <select v-model="formData.type">
                <option selected disabled>Type</option>
                <option
                  v-for="({ name, value }, idx) of productTypes"
                  :key="idx"
                  :value="value"
                >
                  {{ name }}
                </option>
              </select>
            </div>
          </div>

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
                type="text"
                placeholder="Enter quantity"
                v-model="formData.quantity"
              />
            </div>
          </div>
          <button class="button is-primary" type="submit">
            Create product
          </button>
        </form>
      </div>
    </div>
  </Container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, unref } from 'vue';
import Container from '../components/Container.vue';
import Dropdown from '../components/Dropdown.vue';

import { useCreateProduct } from '../api/product.queries';
import { useRouter } from 'vue-router';
import { CreateProductInterface } from '../types/product.interface';
import { computed } from '@vue/reactivity';

export default defineComponent({
  components: {
    Container,
    Dropdown,
  },

  setup() {
    const router = useRouter();
    const productTypes = ref([
      { name: 'Product', value: 'product' },
      { name: 'Service', value: 'service' },
    ]);
    const types = reactive(['product', 'service']);
    const formData = reactive<CreateProductInterface>({
      type: 'product',
      title: 'Some product',
      description: 'Some description',
      features: ['test1', 'test2'],
      price: 100,
      quantity: 1,
    });
    const fileList = ref<string[]>([]);

    const fd = new FormData();

    const { error, data, isSuccess, mutateAsync } = useCreateProduct();

    const getFeatures = computed(() =>
      typeof formData.features === 'string'
        ? formData.features.split(',').map((item) => item.trim())
        : formData.features
    );

    const onFileUpload = (event: any) => {
      const files = event.target.files;
      Array.from(Array(files.length).keys()).forEach((key: any) => {
        fd.append('images', files[key], files[key].name);
        fileList.value.push(files[key].name);
      });
    };

    const onFormSubmit = async () => {
      formData.features = unref(getFeatures);
      console.log(unref(getFeatures));

      Array.from(Object.keys(formData)).forEach((key: any) => {
        fd.append(key, formData[key]);
      });

      await mutateAsync(fd);
      if (isSuccess.value) {
        router.push('/');
      }
    };

    return {
      productTypes,
      formData,
      onFormSubmit,
      onFileUpload,
      data,
      error,
      fileList,
      types,
      getFeatures,
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
