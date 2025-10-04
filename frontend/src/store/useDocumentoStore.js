import { create } from "zustand";
import axios from "axios";

export const useDocumentoStore = create((set) => ({
  documentos: [], // siempre array desde el inicio

  // 📌 Obtener todos los documentos
  fetchDocumentos: async () => {
    try {
      const res = await axios.get("/api/documentos");
      set({ documentos: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error("Error al obtener documentos", err);
      set({ documentos: [] });
    }
  },

  // 📌 Crear y aprobar documento en un solo paso
  createDocumento: async (doc) => {
    try {
      const res = await axios.post("/api/documentos", doc);
      // Actualizamos estado local agregando el nuevo documento
      set((state) => ({
        documentos: [res.data.documento, ...state.documentos],
      }));
      return res.data.documento;
    } catch (err) {
      console.error("Error al crear documento", err);
      throw err;
    }
  },

  // 📌 Actualizar documento
  updateDocumento: async (id, doc) => {
    try {
      const res = await axios.put(`/api/documentos/${id}`, doc);
      set((state) => ({
        documentos: state.documentos.map((d) =>
          d._id === id ? res.data : d
        ),
      }));
      return res.data;
    } catch (err) {
      console.error("Error al actualizar documento", err);
      throw err;
    }
  },

  // 📌 Eliminar documento
  deleteDocumento: async (id) => {
    try {
      await axios.delete(`/api/documentos/${id}`);
      set((state) => ({
        documentos: state.documentos.filter((d) => d._id !== id),
      }));
    } catch (err) {
      console.error("Error al eliminar documento", err);
      throw err;
    }
  },
}));

