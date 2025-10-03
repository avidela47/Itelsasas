import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/documentos";

export const useDocumentoStore = create((set) => ({
  documentos: [],
  loading: false,

  fetchDocumentos: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(API_URL);
      set({ documentos: res.data, loading: false });
    } catch (error) {
      console.error("Error al obtener documentos", error);
      set({ loading: false });
    }
  },

  createDocumento: async (data) => {
    try {
      const res = await axios.post(API_URL, data);
      set((state) => ({ documentos: [res.data, ...state.documentos] }));
    } catch (error) {
      console.error("Error al crear documento", error);
    }
  },

  updateDocumento: async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data);
      set((state) => ({
        documentos: state.documentos.map((d) =>
          d._id === id ? res.data : d
        ),
      }));
    } catch (error) {
      console.error("Error al actualizar documento", error);
    }
  },

  deleteDocumento: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        documentos: state.documentos.filter((d) => d._id !== id),
      }));
    } catch (error) {
      console.error("Error al eliminar documento", error);
    }
  },
}));


