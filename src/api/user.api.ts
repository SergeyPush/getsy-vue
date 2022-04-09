import api from './api';
import { AuthType } from '../types/auth.interface';

enum UserPaths {
  SIGN_UP = '/auth/signup',
  LOG_IN = '/auth/login',
}

export const signUp = async (userData: AuthType) => {
  const response = await api.post(UserPaths.SIGN_UP, {
    ...userData,
  });
  console.log(response);
};

export const logIn = async (userData: AuthType) => {
  const response = api.post(UserPaths.LOG_IN, {
    ...userData,
  });
  console.log(response);
};
