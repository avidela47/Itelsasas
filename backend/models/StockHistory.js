// backend/models/StockHistory.js
import mongoose from "mongoose";

const stockHistorySchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    change: { type: Number, required: true }, // positivo = ingreso, negativo = salida
    reason: { 
      type: String, 
      enum: ["venta", "cancelación", "ajuste", "carga"], 
      required: true 
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // quién hizo el cambio
  },
  { timestamps: true }
);

export default mongoose.model("StockHistory", stockHistorySchema);

