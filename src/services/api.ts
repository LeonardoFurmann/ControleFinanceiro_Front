
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';
import type { Transaction } from "@/types/Transaction";
import { getAuthToken, clearAuthToken } from './authToken';

import axios from 'axios';

// Nessas rotas, 401 significa credencial errada, e não sessão expirada
const AUTH_ROUTES = ['/auth/login', '/auth/register'];

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
    const isAuthRoute = AUTH_ROUTES.includes(error.config?.url);
    if (error.response?.status === 401 && !isAuthRoute) {
      clearAuthToken();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (data: { name: string; email: string; password: string; }) =>
    api.post('/auth/register', data),
};

export const transactionAPI = {
  month: (year: number, month: number) =>
    api.get(`/transactions/month?year=${year}&month=${month}`),

  create: (transaction: Transaction) =>
    api.post(`/transactions`, transaction),

  update: (id: number, transaction: Transaction) =>
    api.put(`/transactions/${id}`, transaction)
};

export const categoryAPI = {
  getAll: () =>
    api.get(`/categories`),

  create: (description: string) =>
    api.post(`/categories`, { description }),

  update: (id: number, description: string) =>
    api.put(`/categories/${id}`, { description }),

  remove: (id: number) =>
    api.delete(`/categories/${id}`),
};

export const paymenteMethodAPI = {
  getAll: () =>
    api.get(`/payment-methods`),

  create: (description: string) =>
    api.post(`/payment-methods`, { description }),

  update: (id: number, description: string) =>
    api.put(`/payment-methods/${id}`, { description }),

  remove: (id: number) =>
    api.delete(`/payment-methods/${id}`),
};

export const transactionTypeAPI = {
  getAll: () =>
    api.get(`/transaction-type`)
};
