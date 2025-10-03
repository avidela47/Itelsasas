import Proveedor from "../models/Proveedor.js";

export const getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener proveedores" });
  }
};

export const createProveedor = async (req, res) => {
  try {
    const proveedor = new Proveedor(req.body);
    await proveedor.save();
    res.status(201).json(proveedor);
  } catch (error) {
    res.status(400).json({ msg: "Error al crear proveedor", error });
  }
};

export const updateProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!proveedor) return res.status(404).json({ msg: "Proveedor no encontrado" });
    res.json(proveedor);
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar proveedor", error });
  }
};

export const deleteProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) return res.status(404).json({ msg: "Proveedor no encontrado" });
    res.json({ msg: "Proveedor eliminado" });
  } catch (error) {
    res.status(400).json({ msg: "Error al eliminar proveedor", error });
  }
};
