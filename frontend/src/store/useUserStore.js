import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "../lib/api";

export const useUserStore = create()(
  persist(
    (set) => ({
      users: [],
      loading: false,
      error: null,

      // 📌 Obtener todos los usuarios (solo admin)
      fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.get("/users");
          const users = Array.isArray(data) ? data : data.users || [];
          set({ users, loading: false });
        } catch (err) {
          const msg =
            err?.response?.data?.message ||
            err?.response?.data?.msg ||
            "Error al cargar usuarios";
          set({ error: msg, loading: false });
        }
      },
    }),
    {
      name: "users", // clave en localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        users: state.users,
      }),
    }
  )
);


