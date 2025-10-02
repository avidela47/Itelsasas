// backend/models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },

    status: {
      type: String,
      enum: [
        "pendiente",   // al crear
        "pagado",      // confirmado (descuenta stock)
        "preparado",   // preparando
        "en camino",   // envío en camino
        "distribuidor",// lo recibe distribuidor
        "entregado",   // finalizado
        "cancelado"    // devuelto (repone stock)
      ],
      default: "pendiente"
    },

    paymentMethod: { type: String, default: "mercadopago" },
    preferenceId: { type: String },
    paymentId: { type: String },
    mpStatus: { type: String },
    mpPayload: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

