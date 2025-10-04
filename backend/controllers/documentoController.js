import Documento from "../models/Documento.js";
import Product from "../models/Product.js";

// 📌 Obtener todos
export const getDocumentos = async (_req, res) => {
  try {
    const docs = await Documento.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    console.error("❌ Error en getDocumentos:", error);
    res.status(500).json({ msg: "Error al obtener documentos" });
  }
};

// 📌 Crear documento (valida productos y stock)
export const createDocumento = async (req, res) => {
  try {
    const { nro, fecha, cliente, articulos } = req.body;

    if (!nro || !fecha || !cliente || !articulos || articulos.length === 0) {
      return res.status(400).json({ msg: "Datos incompletos para el documento" });
    }

    // Validar stock
    for (const item of articulos) {
      const productoDB = await Product.findOne({ code: item.producto });
      if (!productoDB) {
        return res.status(400).json({ msg: `Producto ${item.producto} no existe` });
      }
      if (productoDB.stock < item.cantidad) {
        return res.status(400).json({ msg: `Stock insuficiente para ${item.producto}` });
      }
    }

    // Descontar stock
    for (const item of articulos) {
      const productoDB = await Product.findOne({ code: item.producto });
      productoDB.stock -= item.cantidad;
      await productoDB.save();
    }

    // Crear documento aprobado
    const nuevo = new Documento({
      ...req.body,
      estado: "Aprobado",
    });
    await nuevo.save();

    res.json({ msg: "Documento creado y aprobado", documento: nuevo });
  } catch (error) {
    console.error("❌ Error en createDocumento:", error);
    res.status(500).json({ msg: "Error al crear documento" });
  }
};

// 📌 Actualizar documento
export const updateDocumento = async (req, res) => {
  try {
    const doc = await Documento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doc);
  } catch (error) {
    console.error("❌ Error en updateDocumento:", error);
    res.status(500).json({ msg: "Error al actualizar documento" });
  }
};

// 📌 Eliminar documento
export const deleteDocumento = async (req, res) => {
  try {
    await Documento.findByIdAndDelete(req.params.id);
    res.json({ msg: "Documento eliminado" });
  } catch (error) {
    console.error("❌ Error en deleteDocumento:", error);
    res.status(500).json({ msg: "Error al eliminar documento" });
  }
};



