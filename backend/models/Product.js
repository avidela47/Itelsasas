import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    priceUSD: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
    brand: { type: String, default: "" },
    category: { type: String, default: "" },
    photo: { type: String, default: "" },
    stock: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// ❌ Eliminamos la línea duplicada:
// productSchema.index({ code: 1 }, { unique: true });

export default mongoose.model("Product", productSchema);


