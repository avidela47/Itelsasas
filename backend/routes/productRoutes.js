import express from "express";
import Product from "../models/Product.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Listar
router.get("/", async (_req, res) => {
  const list = await Product.find().sort({ createdAt: -1 });
  res.json(list);
});

// Detalle
router.get("/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ msg: "Producto no encontrado" });
  res.json(p);
});

// Crear (admin)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const p = new Product(req.body);
    await p.save();
    res.json(p);
  } catch (err) {
    res.status(400).json({ msg: "Error al crear producto", error: err.message });
  }
});

// Actualizar (admin)
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!p) return res.status(404).json({ msg: "Producto no encontrado" });
    res.json(p);
  } catch (err) {
    res.status(400).json({ msg: "Error al actualizar", error: err.message });
  }
});

// Eliminar (admin)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ msg: "Producto no encontrado" });
    res.json({ msg: "Producto eliminado" });
  } catch (err) {
    res.status(400).json({ msg: "Error al eliminar", error: err.message });
  }
});

export default router;
