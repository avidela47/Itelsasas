import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../lib/api";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null, // { id, username, email, role }
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.post("/auth/login", { email, password });
          set({ token: data.token, user: data.user, loading: false });
          return true;
        } catch (err) {
          const msg =
            err?.response?.data?.message ||
            err?.response?.data?.msg ||
            "Error al iniciar sesión";
          set({ error: msg, loading: false });
          return false;
        }
      },

      register: async (payload) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.post("/auth/register", payload);
          set({ token: data.token, user: data.user, loading: false });
          return true;
        } catch (err) {
          const msg =
            err?.response?.data?.message ||
            err?.response?.data?.msg ||
            "Error al registrarse";
          set({ error: msg, loading: false });
          return false;
        }
      },

      logout: () => {
        set({ token: null, user: null, error: null });
      },

      isAdmin: () => get()?.user?.role === "admin",
    }),
    {
      name: "auth", // clave en localStorage
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
