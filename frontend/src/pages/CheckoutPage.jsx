import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  TextField,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { useCartStore } from "../store/useCartStore";
import { api } from "../lib/api";

const getImage = (photo) => {
  if (!photo) return "/placeholder.png";
  const s = String(photo);
  return s.startsWith("http") ? s : `/product/${s}`;
};

const CheckoutPage = () => {
  const { items, total, clearCart } = useCartStore();

  const handlePay = async () => {
    try {
      const { data } = await api.post("/orders/create-preference");
      const url = data.init_point || data.sandbox_init_point;

      if (url) {
        await clearCart();
        window.location.href = url;
      } else {
        alert("No se pudo iniciar el pago con Mercado Pago.");
      }
    } catch (err) {
      console.error("Error al generar preferencia:", err);
      alert("Error al generar la preferencia de pago.");
    }
  };

  return (
  <Container maxWidth="md" sx={{ py: { xs: 3, md: 4 } }}>
      {/* 🔹 Título principal en blanco */}
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: "#fff" }}>
        Finalizar compra
      </Typography>

  <Stack spacing={4}>
        {/* 🔹 Caja Resumen con fondo gris oscuro semitransparente */}
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            bgcolor: "rgba(50,50,50,0.7)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
            Resumen del pedido
          </Typography>

          {items.length === 0 ? (
            <Typography sx={{ color: "#fff" }}>No hay productos en el carrito.</Typography>
          ) : (
            <Box>
              {items.map((item) => {
                const product = typeof item.product === "object" ? item.product : item;
                const qty = item.quantity || 1;
                const unit = product.priceUSD || product.price || item.unitPrice || 0;
                const img = getImage(product.photo || item.photo);
                return (
                  <Box
                    key={product._id || item._id}
                    sx={{
                      display: { xs: "flex", md: "flex" },
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: { xs: "flex-start", md: "center" },
                      justifyContent: "space-between",
                      mb: 1.5,
                      gap: 2,
                      p: { xs: 1, md: 1.5 },
                      borderRadius: 2,
                      border: "1px solid #555",
                      backgroundColor: "rgba(70,70,70,0.8)", // igual que en cart
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <img
                        src={img}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: 76,
                          height: 76,
                          objectFit: "contain",
                          borderRadius: 6,
                          background: "transparent",
                        }}
                      />
                      <Box>
                        <Chip
                          size="small"
                          color="warning"
                          label={product.code || item.code || "N/A"}
                          sx={{ fontWeight: 700, mb: 0.3 }}
                        />
                        <Typography fontWeight={600} variant="body2" sx={{ color: "#fff" }}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#ddd" }}>
                          {product.brand || "Sin marca"}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      {unit.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}{" "}
                      x {qty} ={" "}
                      {(unit * qty).toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </Typography>
                  </Box>
                );
              })}

              <Divider sx={{ my: 2, borderColor: "#666" }} />

              {/* Totales */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(70,70,70,0.9)",
                  textAlign: "right",
                }}
              >
                <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>
                  Total
                </Typography>
                <Typography variant="h5" fontWeight={800} sx={{ color: "#2ecc71" }}>
                  {Number(total || 0).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontStyle: "italic", color: "#ccc" }}
                >
                  IVA incluido
                </Typography>
              </Box>
            </Box>
          )}
        </Paper>

        {/* 🔹 Caja Datos comprador igual en gris oscuro */}
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            bgcolor: "rgba(50,50,50,0.7)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
            Datos del comprador
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Nombre completo"
              fullWidth
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              label="Teléfono"
              type="tel"
              fullWidth
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              label="Dirección de entrega"
              fullWidth
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
          </Stack>
        </Paper>

        {/* Botón */}
        <Box textAlign={{ xs: "center", md: "right" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handlePay}
            fullWidth={{ xs: true, md: false }}
            sx={{
              fontWeight: 600,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              transition: "all 0.2s ease-in-out",
              px: { xs: 4, md: 3 },
              py: { xs: 1.25, md: 1.5 },
              width: { xs: '100%', md: 'auto' },
              "&:hover": {
                backgroundColor: "#115293",
                boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Realizar pago
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default CheckoutPage;


