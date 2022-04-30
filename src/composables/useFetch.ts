import { ref } from 'vue';
import { getAllProducts } from '../api/product.api';

export const useFetch = () => {
  const data = ref();
  const error = ref();
  const isLoading = ref(false);

  const fetchData = async (type?: 'product' | 'service') => {
    try {
      isLoading.value = true;
      const res = await getAllProducts(type);
      data.value = res;
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, error, isLoading, fetchData };
};
