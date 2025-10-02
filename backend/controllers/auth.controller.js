import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Faltan campos" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email ya registrado" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
      role: role === "admin" ? "admin" : "user",
    });

    const token = signToken(user);

    return res.status(201).json({
      message: "Usuario registrado",
      token,
      user: {
        id: user._id.toString(), // 👈 homogéneo: siempre `id`
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Error en registro", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Faltan credenciales" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Credenciales inválidas" });

    const token = signToken(user);

    return res.json({
      message: "Login correcto",
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Error en login", error: err.message });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("_id username email role createdAt");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json({
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Error al obtener perfil", error: err.message });
  }
};
