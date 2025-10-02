// src/pages/CheckoutCancel.jsx
import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CheckoutCancel = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        🚫 Pago cancelado
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Cancelaste el proceso de pago. Tu carrito sigue intacto, podés volver a intentarlo cuando quieras.
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button variant="outlined" onClick={() => navigate("/cart")}>
          Volver al carrito
        </Button>
        <Button variant="contained" onClick={() => navigate("/checkout")}>
          Reintentar pago
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutCancel;
