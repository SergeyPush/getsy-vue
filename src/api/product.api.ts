import api from './api';
import { ProductInterface } from '../types/product.interface';

export const createProduct = async (formData: ProductInterface) => {
  return await api.post('/product', {
    ...formData,
  });
};
