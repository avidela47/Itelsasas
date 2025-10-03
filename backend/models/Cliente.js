import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    logo: { type: String },
    cuit: { type: String, required: true, unique: true },
    domicilio: { type: String },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("Cliente", clienteSchema);
