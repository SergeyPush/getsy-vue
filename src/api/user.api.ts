import api from './api';
import { AuthType } from '../types/auth.interface';

enum UserPaths {
  SIGN_UP = '/auth/signup',
  LOG_IN = '/auth/login',
}

export const logIn = async (userData: AuthType) => {
  return await api.post(UserPaths.LOG_IN, {
    ...userData,
  });
};

export const signUp = async (userData: AuthType) => {
  return await api.post(UserPaths.SIGN_UP, {
    ...userData,
  });
};
