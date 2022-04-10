import { useMutation, useQuery } from 'vue-query';
import { createProduct, getAllProducts } from './product.api';
import { ProductInterface } from '../types/product.interface';

export function useCreateProduct() {
  return useMutation((data) => createProduct(data), {
    onMutate: (vars: ProductInterface) => {},
  });
}

export const useGetAllProducts = (type: string) => {
  return useQuery(['products', type], () => getAllProducts(type), {
    retry: 1,
  });
};
