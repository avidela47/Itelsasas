// /src/lib/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// Agrega Authorization si hay token guardado
api.interceptors.request.use((config) => {
  try {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const parsed = JSON.parse(saved);
      const token = parsed?.state?.token; // 👈 así lo guarda zustand-persist
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (err) {
    console.error("Error leyendo token del storage:", err);
  }
  return config;
});

// Manejo simple de 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // opcional: limpiar sesión
      // localStorage.removeItem("auth");
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

