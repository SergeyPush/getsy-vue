<template>
  <Container>
    <Confirm
      :displayModal="confirmDialog"
      @delete="deleteProduct"
      @close="confirmDialog = false"
    ></Confirm>
    <EditProduct
      :visible="displayDialog"
      :data="product"
      @closeDialog="displayDialog = false"
      v-if="product"
    >
    </EditProduct>
    <div class="controls">
      <button class="button is-success" @click="displayDialog = true">
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
    <div class="p-fluid" v-if="product">
      <p>author</p>
      <h2 class="title item">{{ product.title }}</h2>
      <p class="description item" v-html="product.description" />
      <p class="price item">Price: {{ product.price }}$</p>
      <p class="availability">Available in stock: {{ product.quantity }}</p>
      <p class="features">Highlights:</p>
      <ul>
        <li v-for="(feature, idx) of product.features" :key="idx">
          - {{ feature }}
        </li>
      </ul>
    </div>
  </Container>
</template>

<script lang="ts">
import Container from '../components/Container.vue';
import EditProduct from '../components/product/EditProduct.vue';
import Confirm from '../components/product/Confirm.vue';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGetProduct, useDeleteProduct } from '../api/product.queries';

export default defineComponent({
  components: {
    Container,
    EditProduct,
    Confirm,
  },
  setup() {
    const { params } = useRoute();
    const router = useRouter();
    const id = Number(params?.id);
    const { isSuccess, mutate } = useDeleteProduct();
    const { data: product } = useGetProduct(id);
    const displayDialog = ref(false);
    const confirmDialog = ref(false);

    const deleteProduct = async () => {
      mutate(id);
      if (isSuccess) {
        router.push('/');
        confirmDialog.value = false;
      }
    };

    return { product, confirmDialog, displayDialog, deleteProduct };
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
.features {
  font-weight: 500;
}
</style>
