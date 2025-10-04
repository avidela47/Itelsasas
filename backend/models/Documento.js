import mongoose from "mongoose";

const articuloSchema = new mongoose.Schema({
  producto: { type: String, required: true },   // corresponde a Product.code
  descripcion: { type: String },
  cantidad: { type: Number, required: true, min: 1 },
  precio: { type: Number, required: true, min: 0 }, // lo que se cobre en ese momento
});

const documentoSchema = new mongoose.Schema(
  {
    nro: { type: String, required: true },
    fecha: { type: Date, required: true },
    cliente: { type: String, required: true },
    cuit: { type: String },
    domicilio: { type: String },
    localidad: { type: String },
    articulos: [articuloSchema],
    estado: { type: String, default: "Pendiente" },
  },
  { timestamps: true }
);

const Documento = mongoose.model("Documento", documentoSchema);
export default Documento;


