// backend/routes/paymentRoutes.js
import express from "express";
import { MercadoPagoConfig, Payment } from "mercadopago";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import StockHistory from "../models/StockHistory.js";

const router = express.Router();
const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

// Helper: descuenta stock y registra historial
const discountStockAndHistory = async (order, userId) => {
  for (const item of order.items) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock = Math.max(0, (product.stock || 0) - item.quantity);
      await product.save();
      await StockHistory.create({
        product: product._id,
        change: -item.quantity,
        reason: "venta",
        user: userId,
      });
    }
  }
};

// Webhook de Mercado Pago
router.post("/webhook", async (req, res) => {
  try {
    // MP puede enviar por query o body
    const paymentId =
      req.query["data.id"] ||
      req.body?.data?.id ||
      req.body?.data?.payment?.id ||
      req.body?.id;

    if (!paymentId) {
      // Si viene notificación de tipo que no es "payment", igual OK
      return res.sendStatus(200);
    }

    const payment = await new Payment(mp).get({ id: paymentId });
    const metadata = payment?.metadata || {};
    const orderId = metadata?.orderId;
    const userId = metadata?.userId;

    if (!orderId) {
      // No asociada a una orden nuestra
      return res.sendStatus(200);
    }

    const order = await Order.findById(orderId);
    if (!order) return res.sendStatus(200);

    // Actualizar info de pago
    order.paymentId = String(payment.id);
    order.mpStatus = payment.status; // approved / rejected / pending
    order.mpPayload = payment;

    if (payment.status === "approved") {
      // Pago aprobado => cambiar estado y descontar stock
      order.status = "pagado";
      await order.save();

      // Descontar stock + historial
      await discountStockAndHistory(order, userId);

      // Vaciar carrito del usuario
      if (userId) {
        const cart = await Cart.findOne({ user: userId });
        if (cart) {
          cart.items = [];
          cart.total = 0;
          await cart.save();
        }
      }
    } else if (payment.status === "rejected") {
      order.status = "pendiente"; // o "cancelado", a tu gusto
      await order.save();
    } else if (payment.status === "pending" || payment.status === "in_process") {
      order.status = "pendiente";
      await order.save();
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(500);
  }
});

export default router;
