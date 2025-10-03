import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/clientes"; // 🔹 Ajustá si tenés otra URL

export const useClienteStore = create((set) => ({
  clientes: [],
  loading: false,

  fetchClientes: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(API_URL);
      set({ clientes: res.data, loading: false });
    } catch (error) {
      console.error("Error al obtener clientes", error);
      set({ loading: false });
    }
  },

  createCliente: async (data) => {
    try {
      const res = await axios.post(API_URL, data);
      set((state) => ({ clientes: [...state.clientes, res.data] }));
    } catch (error) {
      console.error("Error al crear cliente", error);
    }
  },

  updateCliente: async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data);
      set((state) => ({
        clientes: state.clientes.map((c) => (c._id === id ? res.data : c)),
      }));
    } catch (error) {
      console.error("Error al actualizar cliente", error);
    }
  },

  deleteCliente: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        clientes: state.clientes.filter((c) => c._id !== id),
      }));
    } catch (error) {
      console.error("Error al eliminar cliente", error);
    }
  },
}));


