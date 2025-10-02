// src/pages/CheckoutPending.jsx
import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CheckoutPending = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        ⏳ Pago pendiente
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Estamos procesando tu pago. Te avisaremos por email cuando se confirme.
      </Typography>
      <Box>
        <Button variant="contained" onClick={() => navigate("/orders/my")}>
          Ver mis pedidos
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPending;



