// src/pages/CartPage.jsx
import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  Button,
  Divider,
  Stack,
  Chip,
  Alert,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

// Resolver foto
const getImage = (photo) => {
  if (!photo) return "/placeholder.png";
  const str = String(photo);
  if (str.startsWith("http")) return str;
  return `/product/${str}`;
};

const getProductObj = (item) =>
  (item && typeof item.product === "object" ? item.product : item) || {};
const getProductId = (item) =>
  (item?.product && (item.product._id || item.product.id)) ||
  item?.productId ||
  item?._id ||
  item?.id;
const getUnitPrice = (item) => {
  const p = getProductObj(item);
  return (
    (typeof p.priceUSD === "number" && p.priceUSD) ||
    (typeof p.price === "number" && p.price) ||
    (typeof item?.unitPrice === "number" && item.unitPrice) ||
    0
  );
};

const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    total,
    loading,
    error,
    fetchCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleDec = (item) => {
    const q = Math.max(1, (item?.quantity || 1) - 1);
    updateQuantity(getProductId(item), q);
  };
  const handleInc = (item) => {
    updateQuantity(getProductId(item), (item?.quantity || 1) + 1);
  };
  const handleRemove = (item) => {
    removeFromCart(getProductId(item));
  };
  const handleClear = () => {
    clearCart();
  };
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 4 } }}>
      {/* 🔹 Título en blanco */}
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: "#fff" }}>
        Carrito de Compras
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {items.length === 0 ? (
        <Typography sx={{ color: "#fff" }}>No hay productos en el carrito.</Typography>
      ) : (
        <>
          <Paper
            sx={{
              p: { xs: 1, md: 2 },
              mb: 3,
              backgroundColor: "rgba(50,50,50,0.7)",
            }}
          >
            {items.map((item) => {
              const p = getProductObj(item);
              const id = getProductId(item);
              const img = getImage(p.photo || item.photo);
              const qty = item?.quantity || 1;
              const unit = getUnitPrice(item);

              return (
                <Box
                  key={id}
                  sx={{
                    display: { xs: "flex", md: "flex" },
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "flex-start", md: "center" },
                    justifyContent: "space-between",
                    gap: 1.5,
                    mb: 1.5,
                    p: 1.5,
                    borderRadius: 2,
                    border: "1px solid #555",
                    minHeight: 100,
                    backgroundColor: "rgba(70,70,70,0.8)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {/* Izquierda */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      width: { xs: "100%", md: "auto" },
                    }}
                  >
                    <img
                      src={img}
                      alt={p.name || "Producto"}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: 76,
                        height: 76,
                        objectFit: "contain",
                        borderRadius: 6,
                        background: "#222",
                      }}
                    />
                    <Box sx={{ maxWidth: { xs: "100%", md: 200 }, flex: 1 }}>
                      <Chip
                        size="small"
                        color="warning"
                        label={p.code || item.code || "N/A"}
                        sx={{ fontWeight: 700, mb: 0.3 }}
                      />
                      <Typography
                        fontWeight={600}
                        variant="body2"
                        noWrap
                        sx={{ color: "#fff" }}
                      >
                        {p.name || item.name || "Producto"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#ddd" }}>
                        {p.brand || item.brand || "Sin marca"}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#2ecc71" }}>
                        {unit.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })}
                        {" x "}
                        {qty} ={" "}
                        {(unit * qty).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Derecha / Controls */}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      mt: { xs: 1, md: 0 },
                      width: { xs: "100%", md: "auto" },
                      justifyContent: { xs: "space-between", md: "flex-end" },
                    }}
                  >
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <IconButton
                        size="small"
                        onClick={() => handleDec(item)}
                        disabled={loading || qty <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        <Remove fontSize="small" sx={{ color: "#fff" }} />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", minWidth: 24, textAlign: "center" }}
                      >
                        {qty}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleInc(item)}
                        disabled={loading}
                        aria-label="Aumentar cantidad"
                      >
                        <Add fontSize="small" sx={{ color: "#fff" }} />
                      </IconButton>
                    </Stack>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemove(item)}
                      disabled={loading}
                      aria-label="Eliminar producto"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                    <Box sx={{ minWidth: 160, textAlign: "right" }}>
                      <Typography variant="body2" sx={{ color: "#2ecc71" }}>
                        {(unit * qty).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              );
            })}

            <Divider sx={{ my: 2, borderColor: "#666" }} />

            {/* Totales */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Total
              </Typography>
              <Typography variant="h6" sx={{ color: "#2ecc71" }}>
                {Number(total || 0).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </Typography>
            </Box>
          </Paper>

          {/* Botones finales centrados */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            justifyContent="center" // 👉 centrados respecto al contenedor
            sx={{ mt: 2 }}
          >
            {/* 🔹 Vaciar carrito */}
            <Button
              onClick={handleClear}
              disabled={loading}
              sx={{
                backgroundColor: "#d32f2f",
                color: "#fff",
                fontWeight: 600,
                minWidth: 180,
                px: 2.5,
                "&:hover": {
                  backgroundColor: "#9a0007",
                },
              }}
            >
              Vaciar carrito
            </Button>

            {/* 🔹 Continuar compra */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              disabled={loading}
              sx={{
                fontWeight: 600,
                minWidth: 180,
                px: 2.5,
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#115293",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Continuar compra
            </Button>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default CartPage;











