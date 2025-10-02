import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.put("/update", verifyToken, updateQuantity);
router.delete("/remove/:productId", verifyToken, removeFromCart);
router.delete("/clear", verifyToken, clearCart);

export default router;

