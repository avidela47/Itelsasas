import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Obtener carrito
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [], total: 0 });
      await cart.save();
    }
    res.json({
      items: cart.items,
      total: cart.total,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener carrito" });
  }
};

// Agregar producto
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });
    if (product.stock < quantity) return res.status(400).json({ msg: "Stock insuficiente" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [], total: 0 });

    const idx = cart.items.findIndex((i) => String(i.product) === String(productId));

    if (idx >= 0) {
      // actualizar cantidad y subtotal
      cart.items[idx].quantity += quantity;
      cart.items[idx].subtotal = cart.items[idx].quantity * product.priceUSD;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        subtotal: product.priceUSD * quantity,
      });
    }

    cart.total = cart.items.reduce((acc, i) => acc + i.subtotal, 0);
    await cart.save();

    const populated = await cart.populate("items.product");
    res.json({
      items: populated.items,
      total: populated.total,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error al agregar al carrito" });
  }
};

// Actualizar cantidad
export const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (quantity < 1) return res.status(400).json({ msg: "Cantidad inválida" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Producto no encontrado" });
    if (product.stock < quantity) return res.status(400).json({ msg: "Stock insuficiente" });

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    const idx = cart.items.findIndex((i) => String(i.product) === String(productId));
    if (idx < 0) return res.status(404).json({ msg: "Producto no está en carrito" });

    cart.items[idx].quantity = quantity;
    cart.items[idx].subtotal = product.priceUSD * quantity;

    cart.total = cart.items.reduce((acc, i) => acc + i.subtotal, 0);
    await cart.save();

    const populated = await cart.populate("items.product");
    res.json({
      items: populated.items,
      total: populated.total,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar cantidad" });
  }
};

// Quitar producto
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });

    cart.items = cart.items.filter((i) => String(i.product) !== String(productId));
    cart.total = cart.items.reduce((acc, i) => acc + i.subtotal, 0);
    await cart.save();

    const populated = await cart.populate("items.product");
    res.json({
      items: populated.items,
      total: populated.total,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error al quitar producto" });
  }
};

// Vaciar carrito
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.json({ items: [], total: 0 });

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json({ items: [], total: 0 });
  } catch (err) {
    res.status(500).json({ msg: "Error al vaciar carrito" });
  }
};
