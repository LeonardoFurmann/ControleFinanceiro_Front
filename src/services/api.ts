const API_URL = 'http://localhost:5000';

import axios from 'axios';

const api = axios.create({
    baseURL: API_URL,
    headers:{
        'Content-Type': 'application/json'
    },
})

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/login', { email, password }),

  register: (data: {  name: string; email: string; password: string;}) =>
    api.post('/register', data),
};


