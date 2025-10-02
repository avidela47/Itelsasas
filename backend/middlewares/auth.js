import jwt from "jsonwebtoken";

// Verifica que el token sea válido
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido", error: err.message });
  }
};

// Verifica que el usuario tenga rol admin
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Solo accesible por admin" });
  }
  next();
};

