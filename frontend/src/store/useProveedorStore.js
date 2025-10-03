import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/proveedores";

export const useProveedorStore = create((set) => ({
  proveedores: [],
  loading: false,

  fetchProveedores: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(API_URL);
      set({ proveedores: res.data, loading: false });
    } catch (error) {
      console.error("Error al obtener proveedores", error);
      set({ loading: false });
    }
  },

  createProveedor: async (data) => {
    try {
      const res = await axios.post(API_URL, data);
      set((state) => ({ proveedores: [...state.proveedores, res.data] }));
    } catch (error) {
      console.error("Error al crear proveedor", error);
    }
  },

  updateProveedor: async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data);
      set((state) => ({
        proveedores: state.proveedores.map((p) =>
          p._id === id ? res.data : p
        ),
      }));
    } catch (error) {
      console.error("Error al actualizar proveedor", error);
    }
  },

  deleteProveedor: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        proveedores: state.proveedores.filter((p) => p._id !== id),
      }));
    } catch (error) {
      console.error("Error al eliminar proveedor", error);
    }
  },
}));

