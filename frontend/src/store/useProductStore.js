import { create } from "zustand";
import { api } from "../lib/api";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/products");

      // 🔹 Normalizamos: si data es array, lo usamos directo.
      // Si viene en un objeto { products: [...] }, usamos eso.
      const products = Array.isArray(data) ? data : data.products || [];

      set({ products, loading: false });
    } catch (err) {
      console.error("Error fetchProducts:", err);
      set({ error: "Error al cargar productos", loading: false });
    }
  },

  createProduct: async (payload) => {
    const { data } = await api.post("/products", payload);
    set((s) => ({ products: [data, ...s.products] }));
  },

  updateProduct: async (id, payload) => {
    const { data } = await api.put(`/products/${id}`, payload);
    set((s) => ({
      products: s.products.map((p) => (p._id === id ? data : p)),
    }));
  },

  deleteProduct: async (id) => {
    await api.delete(`/products/${id}`);
    set((s) => ({ products: s.products.filter((p) => p._id !== id) }));
  },
}));
