// src/pages/CheckoutSuccess.jsx
import React, { useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { fetchCart, clearCart } = useCartStore();

  useEffect(() => {
    // 🔹 Vaciar el carrito en el estado local inmediatamente
    clearCart();
    // 🔹 Y sincronizar con backend para asegurarnos que quede vacío
    fetchCart();
  }, [clearCart, fetchCart]);

  return (
    <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        ✅ ¡Pago aprobado!
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Gracias por tu compra. Te enviamos la confirmación a tu correo.
      </Typography>
      <Box>
        <Button
          variant="contained"
          onClick={() => navigate("/orders/my")}
        >
          Ver mis pedidos
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutSuccess;



