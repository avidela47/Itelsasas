// backend/routes/orderRoutes.js
import express from "express";
import { verifyToken, isAdmin } from "../middlewares/auth.js";
import {
  createPreference,
  confirmPayment,
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Mercado Pago
router.post("/create-preference", verifyToken, createPreference);
router.get("/payment-result", confirmPayment);

// Órdenes
router.post("/", verifyToken, createOrder);
router.get("/my", verifyToken, getMyOrders);
router.get("/", verifyToken, isAdmin, getAllOrders);
router.put("/:id/status", verifyToken, isAdmin, updateOrderStatus);

export default router;
