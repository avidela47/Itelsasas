import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const PaymentResult = ({ type }) => {
  const { search } = useLocation(); // query params: payment_id, status, etc.

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 }, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        {type === "success" && "✅ ¡Pago aprobado!"}
        {type === "failure" && "❌ Pago rechazado"}
        {type === "pending" && "⏳ Pago pendiente"}
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {search} {/* muestra parámetros de Mercado Pago */}
      </Typography>

      <Button component={Link} to="/catalogo" variant="contained" fullWidth sx={{ mt: 2, maxWidth: { xs: '100%', md: 240 } }}>
        Volver al catálogo
      </Button>
    </Container>
  );
};

export default PaymentResult;
