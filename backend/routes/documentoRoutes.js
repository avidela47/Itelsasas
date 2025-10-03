import express from "express";
import {
  getDocumentos,
  createDocumento,
  updateDocumento,
  deleteDocumento,
} from "../controllers/documentoController.js";

const router = express.Router();

router.get("/", getDocumentos);
router.post("/", createDocumento);
router.put("/:id", updateDocumento);
router.delete("/:id", deleteDocumento);

export default router;

