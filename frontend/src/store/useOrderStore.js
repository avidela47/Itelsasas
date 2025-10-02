// src/store/useOrderStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "../lib/api";

export const useOrderStore = create()(
  persist(
    (set) => ({
      orders: [],      // pedidos para admin
      myOrders: [],    // pedidos del usuario logueado
      loading: false,
      error: null,

      // 📌 Admin: obtener todos los pedidos
      fetchOrders: async () => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.get("/orders");
          const orders = Array.isArray(data) ? data : data.orders || [];
          set({ orders, loading: false });
        } catch (err) {
          const status = err?.response?.status;
          const serverMsg =
            err?.response?.data?.message || err?.response?.data?.msg;
          const msg =
            status === 401
              ? "No autorizado. Iniciá sesión."
              : status === 403
              ? "Acceso solo para administradores."
              : serverMsg || "Error al cargar pedidos";
          console.error("fetchOrders error:", err);
          set({ error: msg, loading: false });
        }
      },

      // 📌 Usuario: obtener solo mis pedidos
      fetchMyOrders: async () => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.get("/orders/my");
          const myOrders = Array.isArray(data) ? data : data.orders || [];
          set({ myOrders, loading: false });
        } catch (err) {
          const status = err?.response?.status;
          const serverMsg =
            err?.response?.data?.message || err?.response?.data?.msg;
          const msg =
            status === 401
              ? "No autorizado. Iniciá sesión."
              : serverMsg || "Error al cargar tus pedidos";
          console.error("fetchMyOrders error:", err);
          set({ error: msg, loading: false });
        }
      },

      // 📌 Admin: actualizar estado de un pedido
      updateOrderStatus: async (orderId, status) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.put(`/orders/${orderId}/status`, { status });

          // ✅ Ahora reemplazamos el pedido completo que devuelve el backend
          set((state) => ({
            orders: state.orders.map((o) =>
              o._id === orderId ? data.order : o
            ),
            loading: false,
          }));
        } catch (err) {
          const serverMsg =
            err?.response?.data?.message || err?.response?.data?.msg;
          console.error("updateOrderStatus error:", err);
          set({
            error: serverMsg || "Error al actualizar estado",
            loading: false,
          });
        }
      },
    }),
    {
      name: "orders", // clave en localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        orders: state.orders,
        myOrders: state.myOrders,
      }),
    }
  )
);


