import axios from "axios";

const api = axios.create({
  baseURL: "https://skillswapbackend.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add token to request headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token:", localStorage.getItem("token"));

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No token found in localStorage");
  }
  return config;
});

export default api;
