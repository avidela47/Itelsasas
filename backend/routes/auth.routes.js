// backend/routes/auth.routes.js
import express from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.js";  // 👈 usamos verifyToken

const router = express.Router();

// Registro de usuario
router.post("/register", register);

// Login de usuario
router.post("/login", login);

// Obtener perfil del usuario logueado
router.get("/me", verifyToken, me);

export default router;



