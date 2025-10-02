// /controllers/user.controller.js
import User from "../models/User.js";

// 🔹 Obtener todos los usuarios (solo admin)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id username email role createdAt");
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: "Error al obtener usuarios", error: err.message });
  }
};

// 🔹 (opcional) Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.json({ message: "Usuario eliminado" });
  } catch (err) {
    return res.status(500).json({ message: "Error al eliminar usuario", error: err.message });
  }
};

// 🔹 (opcional) Cambiar rol de usuario
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("_id username email role");
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Error al actualizar rol", error: err.message });
  }
};
