import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Rutas
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

// CORS permitido solo a tu front
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL?.trim().replace(/\/+$/, "")
].filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("No permitido por CORS"));
  },
  credentials: true,
}));

app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

connectDB();

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);

// Ping
app.get("/ping", (_req, res) => res.json({ msg: "API funcionando 🚀" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
