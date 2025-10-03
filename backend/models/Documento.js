import mongoose from "mongoose";

const documentoSchema = new mongoose.Schema(
  {
    nro: { type: String, required: true, unique: true },
    fecha: { type: Date, default: Date.now },
    cliente: { type: String, required: true },
    cuit: { type: String },
    domicilio: { type: String },
    localidad: { type: String },
    articulos: [
      {
        articulo: String,      // nombre o código
        cantidad: Number,
        descripcion: String,
        precio: Number,
      },
    ],
    estado: { type: String, enum: ["Borrador", "Aprobado"], default: "Borrador" },
  },
  { timestamps: true }
);

export default mongoose.model("Documento", documentoSchema);

