// /routes/user.routes.js
import express from "express";
import { getUsers, deleteUser, updateUserRole } from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Solo admins pueden listar o modificar usuarios
router.get("/", verifyToken, isAdmin, getUsers);
router.delete("/:id", verifyToken, isAdmin, deleteUser);
router.put("/:id/role", verifyToken, isAdmin, updateUserRole);

export default router;
