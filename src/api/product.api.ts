import api from './api';
import { AxiosError } from 'axios';
import { ProductInterface } from '../types/product.interface';

class AxiosErrorMessage extends Error {
  constructor(message: AxiosError) {
    super('Error');
    this.message = message.response?.data?.message;
  }
}

export const createProduct = async (formData: any) => {
  try {
    const res = await api.post('/products', {
      ...formData,
    });
    return res.data;
  } catch (error) {
    throw new AxiosErrorMessage(error as AxiosError).message;
  }
};

export const getAllProducts = async (type?: string) => {
  try {
    const res = await api.get('/products', { params: { type } });
    return res.data;
  } catch (error) {
    throw new AxiosErrorMessage(error as AxiosError).message;
  }
};

export const getProduct = async (id: number) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Product not found').message;
  }
};

export const deleteProdcut = async (id: number) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    throw new Error('Something went wrong').message;
  }
};

export const updateProduct = async (data: ProductInterface) => {
  const { id, ...rest } = data;
  try {
    await api.patch(`/products/${id}`, {
      ...rest,
    });
  } catch (error) {
    throw new Error('Incorrecet data').message;
  }
};
