import { useMutation, useQuery } from 'vue-query';
import {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProdcut,
} from './product.api';
import { ProductInterface } from '../types/product.interface';

export function useCreateProduct() {
  return useMutation((data) => createProduct(data), {
    onMutate: (vars: ProductInterface) => {},
  });
}

export const useGetAllProducts = (type?: string) => {
  return useQuery(['products', type], () => getAllProducts(type), {
    retry: 1,
  });
};

export const useGetProduct = (id: number) => {
  return useQuery(['product', id], () => getProduct(id), { retry: 1 });
};

export const useDeleteProduct = () => {
  return useMutation((id) => deleteProdcut(id), {
    onMutate: (vars: number) => {},
  });
};
