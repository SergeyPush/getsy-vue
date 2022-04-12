import { useMutation, useQuery, QueryClient } from 'vue-query';
import {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProdcut,
} from './product.api';
import { ProductInterface } from '../types/product.interface';

const queryClient = new QueryClient();

export function useCreateProduct() {
  return useMutation((data) => createProduct(data), {
    onMutate: (vars: ProductInterface) => {},
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
}

export const useGetAllProducts = (type?: string) => {
  return useQuery(['products', type], () => getAllProducts(type), {
    retry: 2,
    refetchOnMount: true,
    retryDelay: 2000,
  });
};

export const useGetProduct = (id: number) => {
  return useQuery(['product', id], () => getProduct(id), { retry: 1 });
};

export const useDeleteProduct = () => {
  return useMutation((id) => deleteProdcut(id), {
    onMutate: (vars: number) => {},
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
};
