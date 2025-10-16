const API_URL = 'http://localhost:5000';
import { getAuthToken } from './authToken';

import axios from 'axios';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/login', { email, password }),

  register: (data: { name: string; email: string; password: string; }) =>
    api.post('/register', data),
};

export const transactionAPI = {
  month: (year: number, month: number) =>
    api.get(`/transaction/month?year=${year}&month=${month}`)
};

