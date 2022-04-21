<template>
  <Container>
    <Confirm
      :displayModal="confirmDialog"
      @delete="deleteProduct"
      @close="confirmDialog = false"
    />
    <EditProduct
      :visible="editDialog"
      :data="product"
      @close="editDialog = false"
      v-if="product"
    />

    <div class="controls mb-3">
      <button class="button is-success" @click="editDialog = true">
        <span class="icon">
          <i class="fa fa-pencil"></i>
        </span>
        <span>Edit</span>
      </button>
      <button class="button is-danger" @click="confirmDialog = true">
        <span class="icon">
          <i class="fa fa-trash-o"></i>
        </span>
        <span>Delete</span>
      </button>
    </div>

    <div class="columns">
      <div class="column" v-if="product?.images.length > 0">
        <ImageList :images="product.images" />
      </div>
      <div class="column" v-if="product">
        <p>author</p>
        <h2 class="title item">{{ product.title }}</h2>
        <p class="description item" v-html="product.description" />
        <p class="price item">Price: {{ product.price }}$</p>
        <p class="availability">Available in stock: {{ product.quantity }}</p>
        <p class="label-bold">Highlights:</p>
        <ul class="features-list">
          <li v-for="(feature, idx) of product.features" :key="idx">
            - {{ feature }}
          </li>
        </ul>

        <p class="mt-2">
          <span class="label-bold">Added:</span> <span>{{ time }}</span>
        </p>
      </div>
    </div>
  </Container>
</template>

<script lang="ts">
import Container from '../components/Container.vue';
import Edit from '../components/product/EditProduct1.vue';
import Confirm from '../components/product/Confirm.vue';
import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGetProduct, useDeleteProduct } from '../api/product.queries';
import EditProduct from '../components/product/EditProduct.vue';
import ImageList from '../components/product/ImageList.vue';
import ImageModal from '../components/product/ImageModal.vue';
import { getDate } from './../helpers/date.helpers';
import { computed } from '@vue/reactivity';

export default defineComponent({
  components: {
    Container,
    Edit,
    Confirm,
    EditProduct,
    ImageList,
    ImageModal,
  },
  setup() {
    const { params } = useRoute();
    const router = useRouter();
    const id = Number(params?.id);
    const { isSuccess, mutate } = useDeleteProduct();
    const { data: product, isLoading } = useGetProduct(id);
    const displayDialog = ref(false);
    const confirmDialog = ref(false);
    const editDialog = ref(false);

    const time = computed(() => getDate(product?.value?.createdAt));

    const deleteProduct = async () => {
      mutate(id);
      if (isSuccess) {
        router.push('/');
        confirmDialog.value = false;
      }
    };

    return {
      product,
      confirmDialog,
      editDialog,
      displayDialog,
      deleteProduct,
      isLoading,
      getDate,
      time,
    };
  },
});
</script>

<style scoped lang="scss">
.title {
  font-weight: 500;
  font-size: 36px;
}
.price {
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 10px;
}
.description {
  margin-bottom: 10px;
  font-size: 20px;
}
.availability {
  margin-bottom: 8px;
}
.controls {
  display: flex;
  justify-content: flex-end;
  .button {
    margin-left: 10px;
  }
  .delete {
    background-color: var(--red-400);
    outline-color: var(--red-400);
    border-color: var(--red-400);
  }
}
.label-bold {
  font-weight: 600;
}
</style>
