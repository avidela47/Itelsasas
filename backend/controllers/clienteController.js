import Cliente from "../models/Cliente.js";

export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener clientes" });
  }
};

export const createCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ msg: "Error al crear cliente", error });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar cliente", error });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });
    res.json({ msg: "Cliente eliminado" });
  } catch (error) {
    res.status(400).json({ msg: "Error al eliminar cliente", error });
  }
};
