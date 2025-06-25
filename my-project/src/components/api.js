import axios from 'axios';

const api = axios.create({
  baseURL: 'https://skillswapbackend-3.onrender.com/api/v1', // include /api/v1 here
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
