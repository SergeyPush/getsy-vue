<template>
  <Container>
    <ConfirmDialog></ConfirmDialog>
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
      <button class="button is-danger" @click="confirmDialog">
        <span class="icon">
          <i class="fa fa-trash-o"></i>
        </span>
        <span>Edit</span>
      </button>
    </div>
    <div class="p-fluid" v-if="product">
      <p>author</p>
      <h2 class="title item">{{ product.title }}</h2>
      <p class="description item" v-html="product.description" />
      <p class="price item">Price: {{ product.price }}$</p>
      <p class="availability">Available in stock: {{ product.quantity }}</p>
      <p class="features">Highlights:</p>
      <Chip
        v-for="(chip, idx) of product.features"
        :label="chip"
        :key="idx"
        class="chip"
      />
    </div>
  </Container>
</template>

<script lang="ts">
import Container from '../components/Container.vue';
import Chip from 'primevue/chip';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGetProduct, useDeleteProduct } from '../api/product.queries';
import Button from 'primevue/button';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';
import EditProduct from '../components/product/EditProduct.vue';

export default defineComponent({
  components: {
    Container,
    Chip,
    Button,
    ConfirmDialog,
    EditProduct,
  },
  setup() {
    const { params } = useRoute();
    const router = useRouter();
    const id = Number(params?.id);
    const confirm = useConfirm();
    const { isSuccess, mutate } = useDeleteProduct();
    const { data: product } = useGetProduct(id);
    const displayDialog = ref(false);

    const deleteProduct = async () => {
      mutate(id);
      if (isSuccess) {
        router.push('/');
      }
    };
    const confirmDialog = () => {
      confirm.require({
        message: 'Do you want to delete this item?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
          deleteProduct();
        },
      });
    };

    return { product, confirmDialog, displayDialog, close };
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
.features {
  font-weight: 500;
  margin-bottom: 6px;
}

.chip:not(:last-child) {
  margin-right: 5px;
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
</style>
