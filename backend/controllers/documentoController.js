import Documento from "../models/Documento.js";

// 📌 Obtener todos
export const getDocumentos = async (req, res) => {
  try {
    const docs = await Documento.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener documentos", error });
  }
};

// 📌 Crear nuevo
export const createDocumento = async (req, res) => {
  try {
    const nuevo = new Documento(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear documento", error });
  }
};

// 📌 Actualizar
export const updateDocumento = async (req, res) => {
  try {
    const doc = await Documento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar documento", error });
  }
};

// 📌 Eliminar
export const deleteDocumento = async (req, res) => {
  try {
    await Documento.findByIdAndDelete(req.params.id);
    res.json({ msg: "Documento eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar documento", error });
  }
};
