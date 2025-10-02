import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    const token = JSON.parse(auth).token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
