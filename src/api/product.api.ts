import api from './api';
import { AxiosError } from 'axios';

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
    const res = await api.get('/products');
    return res.data;
  } catch (error) {
    throw new AxiosErrorMessage(error as AxiosError).message;
  }
};

export const createNewProduct = async (formData: any) => {
  try {
    const res = await api.post('/products', {
      ...formData,
    });

    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data?.message;
  }
};
