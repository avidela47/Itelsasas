// src/pages/CheckoutFailure.jsx
import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CheckoutFailure = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        ❌ Pago rechazado
      </Typography>
      <Typography sx={{ mb: 3 }}>
        Tu pago no pudo completarse. Probá nuevamente o elegí otro medio de pago.
      </Typography>
      <Box>
        <Button variant="contained" onClick={() => navigate("/checkout")}>
          Volver al checkout
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutFailure;



