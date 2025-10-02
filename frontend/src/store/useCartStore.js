// src/store/useCartStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "../lib/api";

export const useCartStore = create()(
  persist(
    (set) => ({
      items: [], // [{ product: {...}, quantity, subtotal }]
      total: 0,
      loading: false,
      error: null,

      // Cargar carrito del backend
      fetchCart: async () => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.get("/cart");
          set({
            items: data.items || [],
            total: data.total || 0,
            loading: false,
          });
        } catch (err) {
          set({
            loading: false,
            error:
              err?.response?.data?.message ||
              err?.response?.data?.msg ||
              "Error al cargar carrito",
          });
        }
      },

      addToCart: async (productId, quantity = 1) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.post("/cart/add", { productId, quantity });
          set({
            items: data.items || [],
            total: data.total || 0,
            loading: false,
          });
        } catch (err) {
          set({
            loading: false,
            error:
              err?.response?.data?.message ||
              err?.response?.data?.msg ||
              "Error al agregar al carrito",
          });
        }
      },

      updateQuantity: async (productId, quantity) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.put("/cart/update", { productId, quantity });
          set({
            items: data.items || [],
            total: data.total || 0,
            loading: false,
          });
        } catch (err) {
          set({
            loading: false,
            error:
              err?.response?.data?.message ||
              err?.response?.data?.msg ||
              "Error al actualizar cantidad",
          });
        }
      },

      removeFromCart: async (productId) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.delete(`/cart/remove/${productId}`);
          set({
            items: data.items || [],
            total: data.total || 0,
            loading: false,
          });
        } catch (err) {
          set({
            loading: false,
            error:
              err?.response?.data?.message ||
              err?.response?.data?.msg ||
              "Error al quitar del carrito",
          });
        }
      },

      clearCart: async () => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.delete("/cart/clear");
          set({
            items: data.items || [],
            total: data.total || 0,
            loading: false,
          });
        } catch (err) {
          set({
            loading: false,
            error:
              err?.response?.data?.message ||
              err?.response?.data?.msg ||
              "Error al vaciar carrito",
          });
        }
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        total: state.total,
      }),
    }
  )
);
