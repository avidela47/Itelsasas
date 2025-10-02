// backend/controllers/orderController.js
import dotenv from "dotenv";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import StockHistory from "../models/StockHistory.js";
import { sendMail } from "../utils/mailer.js";
import pkg from "mercadopago";

dotenv.config();
const { MercadoPagoConfig, Preference } = pkg;
const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

// Helper URL
function getBaseUrl() {
  let url = (process.env.CLIENT_URL || "").trim();
  url = url.replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(url)) url = `http://${url}`;
  return url;
}

// Crear preferencia
export const createPreference = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart || !cart.items.length) {
      return res.status(400).json({ msg: "El carrito está vacío" });
    }

    const items = cart.items.map((i) => ({
      title: i.product.name,
      quantity: Number(i.quantity || 1),
      unit_price: Number(i.product.priceUSD || i.product.price || 0),
      currency_id: "ARS",
    }));

    const baseUrl = getBaseUrl();
    const body = {
      items,
      back_urls: {
        success: `${baseUrl}/checkout-success`,
        failure: `${baseUrl}/checkout-failure`,
        pending: `${baseUrl}/checkout-pending`,
      },
      auto_return: "approved",
    };

    const pref = new Preference(mpClient);
    const result = await pref.create({ body });

    const order = new Order({
      user: req.user.id,
      items: cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        subtotal: i.subtotal,
      })),
      total: cart.total,
      status: "pendiente",
      paymentMethod: "mercadopago",
      preferenceId: result.id,
    });
    await order.save();

    res.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (err) {
    console.error("❌ Error en createPreference:", err);
    res.status(500).json({ msg: "Error al crear preferencia", error: err?.message });
  }
};

// Confirmación de pago (MP)
export const confirmPayment = async (req, res) => {
  try {
    const { payment_id, status, preference_id } = req.query;
    if (!payment_id || !status) return res.status(400).json({ msg: "Datos de pago incompletos" });

    const order = await Order.findOne({ preferenceId: preference_id })
      .populate("user")
      .populate("items.product");
    if (!order) return res.status(404).json({ msg: "Orden no encontrada" });

    order.paymentId = payment_id;
    order.mpStatus = status;
    order.status = status === "approved" ? "pagado" : status;
    await order.save();

    // Si aprobado → descuenta stock
    if (status === "approved") {
      for (const item of order.items) {
        const product = await Product.findById(item.product._id);
        if (!product) continue;
        product.stock = Math.max(0, product.stock - item.quantity);
        await product.save();

        await StockHistory.create({
          product: product._id,
          change: -item.quantity,
          reason: "venta",
          user: order.user._id,
        });
      }
      await Cart.findOneAndUpdate({ user: order.user._id }, { items: [], total: 0 });
    }

    await sendMail(
      order.user.email,
      "Resultado de tu pago",
      `<h1>Tu pago fue procesado</h1>
       <p>Pedido: ${order._id}</p>
       <p>Estado: <b>${order.status}</b></p>
       <p>ID de pago: ${payment_id}</p>`
    );

    const baseUrl = getBaseUrl();
    return res.redirect(`${baseUrl}/checkout-${status}?payment_id=${payment_id}`);
  } catch (err) {
    console.error("❌ Error en confirmPayment:", err);
    res.status(500).json({ msg: "Error al confirmar pago", error: err.message });
  }
};

// Crear orden manual
export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart || !cart.items.length) {
      return res.status(400).json({ msg: "El carrito está vacío" });
    }

    const order = new Order({
      user: req.user.id,
      items: cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        subtotal: i.subtotal,
      })),
      total: cart.total,
      status: "pendiente",
      paymentMethod: req.body.paymentMethod || "mercadopago",
    });

    await order.save();

    await sendMail(
      req.user.email,
      "Confirmación de compra",
      `<h1>Gracias por tu compra</h1>
       <p>Tu pedido #${order._id} está en estado <b>${order.status}</b>.</p>`
    );

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: "Error al crear pedido", error: err.message });
  }
};

// Mis pedidos
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product", "name priceUSD brand code");
    res.json(orders);
  } catch {
    res.status(500).json({ msg: "Error al obtener pedidos" });
  }
};

// Admin: todos
export const getAllOrders = async (_req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email")
      .populate("items.product", "name priceUSD brand code");
    res.json(orders);
  } catch {
    res.status(500).json({ msg: "Error al obtener pedidos" });
  }
};

// Admin: actualizar estado
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const valid = [
      "pendiente",
      "pagado",
      "preparado",
      "en camino",
      "distribuidor",
      "entregado",
      "cancelado",
    ];
    if (!valid.includes(status)) {
      return res.status(400).json({ msg: "Estado no válido" });
    }

    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("items.product");
    if (!order) return res.status(404).json({ msg: "Pedido no encontrado" });

    // Stock según transición
    if (status === "pagado" && order.status === "pendiente") {
      for (const item of order.items) {
        const product = await Product.findById(item.product._id);
        if (!product) continue;
        product.stock = Math.max(0, product.stock - item.quantity);
        await product.save();

        await StockHistory.create({
          product: product._id,
          change: -item.quantity,
          reason: "venta",
          user: order.user._id,
        });
      }
    }

    if (status === "cancelado" && order.status !== "cancelado") {
      for (const item of order.items) {
        const product = await Product.findById(item.product._id);
        if (!product) continue;
        product.stock += item.quantity;
        await product.save();

        await StockHistory.create({
          product: product._id,
          change: item.quantity,
          reason: "cancelación",
          user: order.user._id,
        });
      }
    }

    order.status = status;
    await order.save();

    await sendMail(
      order.user.email,
      "Actualización de pedido",
      `<h2>Tu pedido #${order._id}</h2>
       <p>El estado fue actualizado a: <b>${order.status}</b>.</p>`
    );

    res.json({ msg: "Estado actualizado correctamente", order });
  } catch (err) {
    console.error("❌ Error en updateOrderStatus:", err);
    res.status(500).json({ msg: "Error al actualizar estado", error: err.message });
  }
};






