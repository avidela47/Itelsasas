import express from "express";
import {
  getDocumentos,
  createDocumento,
  updateDocumento,
  deleteDocumento,
} from "../controllers/documentoController.js";

const router = express.Router();

// ✅ Obtener todos los documentos
router.get("/", getDocumentos);

// ✅ Crear y aprobar documento (valida stock y descuenta)
router.post("/", createDocumento);

// ✅ Actualizar documento
router.put("/:id", updateDocumento);

// ✅ Eliminar documento
router.delete("/:id", deleteDocumento);

export default router;



