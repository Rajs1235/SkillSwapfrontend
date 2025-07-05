import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // No extra /users here
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log('Base URL:', import.meta.env.VITE_API_BASE_URL);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const isAuthRoute = config.url.includes("/login") || config.url.includes("/signup");

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
