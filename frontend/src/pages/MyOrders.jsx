import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useOrderStore } from "../store/useOrderStore";

const steps = [
  { label: "Pagado", icon: <BuildIcon /> },
  { label: "Preparando tu pedido", icon: <BuildIcon /> },
  { label: "En camino", icon: <LocalShippingIcon /> },
  { label: "En poder del distribuidor", icon: <StoreIcon /> },
  { label: "Entregado", icon: <CheckCircleIcon /> },
];

const statusToStep = {
  pagado: 0,
  preparado: 1,
  "en camino": 2,
  distribuidor: 3,
  entregado: 4,
};

const getStatusColor = (status) => {
  switch (status) {
    case "pagado":
      return "#0288d1";
    case "preparado":
      return "orange";
    case "en camino":
      return "#1976d2";
    case "distribuidor":
      return "#6a1b9a";
    case "entregado":
      return "green";
    case "cancelado":
      return "red";
    default:
      return "#888";
  }
};

function MyOrders() {
  const { myOrders, fetchMyOrders, loading, error } = useOrderStore();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        sx={{ color: "#fff" }}
      >
        Mis Pedidos
      </Typography>

      {myOrders.length === 0 ? (
        <Typography sx={{ color: "#fff" }}>
          No tenés pedidos todavía.
        </Typography>
      ) : (
        myOrders.map((order) => {
          const isCancelado = order.status === "cancelado";
          const activeStep =
            !isCancelado && statusToStep[order.status] !== undefined
              ? statusToStep[order.status]
              : 0;

          return (
            <Paper
              key={order._id}
              sx={{
                p: 3,
                mb: 3,
                bgcolor: "rgba(50,50,50,0.7)",
                borderRadius: 2,
                border: "1px solid #555",
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
                Pedido #{order._id}
              </Typography>

              <Chip
                label={`Estado: ${order.status}`}
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  bgcolor: getStatusColor(order.status),
                  color: "#fff",
                }}
              />

              <Typography
                variant="body2"
                sx={{ mb: 2, color: "#fff" }}
              >
                Total:{" "}
                <b>
                  {Number(order.total || 0).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </b>
              </Typography>

              <Divider sx={{ my: 2, borderColor: "#666" }} />

              {isCancelado ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CancelIcon sx={{ color: "red" }} />
                  <Chip
                    label="Cancelado"
                    sx={{
                      fontWeight: "bold",
                      bgcolor: "red",
                      color: "#fff",
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ overflowX: { xs: 'auto', md: 'visible' }, px: { xs: 1, md: 0 } }}>
                  <Stepper activeStep={activeStep} alternativeLabel sx={{ minWidth: { xs: 600, md: 'auto' } }}>
                    {steps.map((step, index) => (
                      <Step key={step.label} completed={index <= activeStep}>
                        <StepLabel
                          icon={React.cloneElement(step.icon, {
                            sx: {
                              color: index === activeStep ? getStatusColor(order.status) : "#aaa",
                              fontSize: { xs: 18, md: 24 },
                            },
                          })}
                        >
                          <Typography sx={{ color: "#fff", fontSize: { xs: 12, md: 'inherit' } }}>
                            {step.label}
                          </Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              )}

              {order.updatedAt && (
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    display: "block",
                    textAlign: "center",
                    color: "#ccc",
                  }}
                >
                  Última actualización:{" "}
                  {new Date(order.updatedAt).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              )}
            </Paper>
          );
        })
      )}
    </Container>
  );
}

export default MyOrders;









