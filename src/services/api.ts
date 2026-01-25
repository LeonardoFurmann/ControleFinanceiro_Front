const API_URL = 'http://localhost:5000';
import type { Transaction } from "@/types/Transaction";
import { getAuthToken, clearAuthToken } from './authToken';

import axios from 'axios';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

api.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/login', { email, password }),

  register: (data: { name: string; email: string; password: string; }) =>
    api.post('/register', data),
};

export const transactionAPI = {
  month: (year: number, month: number) =>
    api.get(`/transaction/month?year=${year}&month=${month}`),

  create: (transaction: Transaction) => 
    api.post(`/transaction`, transaction)
};

export const categoryAPI = {
  getAll: () =>
    api.get(`/category`)
};

export const paymenteMethodAPI = {
  getAll: () =>
    api.get(`/paymentmethods`)
};

export const transactionTypeAPI = {
  getAll: () =>
    api.get(`/transactiontype`)
};

