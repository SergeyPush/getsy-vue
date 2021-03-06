import { useMutation, useQuery, QueryClient } from 'vue-query';
import {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProdcut,
  getProductsByIds,
} from './product.api';
import { ProductInterface } from '../types/product.interface';
import { updateProduct, getAllProductsByAuthor } from './product.api';

const queryClient = new QueryClient();

export function useCreateProduct() {
  return useMutation((data) => createProduct(data), {
    onMutate: (vars: FormData) => {},
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
}

export const useGetAllProducts = (type?: string) => {
  return useQuery('products', () => getAllProducts(type), {
    retry: 2,
    refetchOnMount: true,
    retryDelay: 2000,
    cacheTime: 2000,
  });
};

export const useGetAllProductsByUser = (id: number) => {
  return useQuery('productsByUser', () => getAllProductsByAuthor(id), {
    retry: 2,
    refetchOnMount: true,
    retryDelay: 2000,
    cacheTime: 2000,
  });
};

export const useGetProduct = (id: number) => {
  return useQuery('product', () => getProduct(id), {
    retry: 2,
    refetchOnMount: true,
    retryDelay: 2000,
    cacheTime: 2000,
  });
};

export const useDeleteProduct = () => {
  return useMutation((id) => deleteProdcut(id), {
    onMutate: (vars: number) => {},
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
};

export const useUpdateProduct = () => {
  return useMutation((data) => updateProduct(data), {
    onMutate: (vars: ProductInterface) => {},
  });
};
