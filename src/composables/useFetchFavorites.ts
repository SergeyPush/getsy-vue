import { ref } from 'vue';
import { getProductsByIds } from '../api/product.api';

export const useFetchFavorites = () => {
  const data = ref();
  const error = ref();
  const isLoading = ref(false);

  const fetchData = async (ids: number[]) => {
    try {
      isLoading.value = true;
      const res = await getProductsByIds(ids);
      data.value = res;
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, error, isLoading, fetchData };
};
