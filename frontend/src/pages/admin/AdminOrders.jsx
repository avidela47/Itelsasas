// src/pages/admin/AdminOrders.jsx
import React, { useEffect } from "react";
import { useOrderStore } from "../../store/useOrderStore";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Chip,
  CircularProgress,
  Box,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function AdminOrders() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { orders, fetchOrders, loading, error, updateOrderStatus } =
    useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    );

  const getStatusColor = (status) => {
    switch (status) {
      case "pendiente":
        return "warning";
      case "pagado":
        return "info";
      case "preparado":
        return "secondary";
      case "en camino":
        return "primary";
      case "distribuidor":
        return "info";
      case "entregado":
        return "success";
      case "cancelado":
        return "error";
      default:
        return "default";
    }
  };

  // 🔹 Estados permitidos (sin "en proceso")
  const estados = [
    "pendiente",
    "pagado",
    "preparado",
    "en camino",
    "distribuidor",
    "entregado",
    "cancelado",
  ];

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const clientesUnicos = new Set(orders.map((o) => o.user?.username || "N/A"));
  const cantidadClientes = clientesUnicos.size;
  const cantidadPedidos = orders.length;

  const estadosCount = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* 🔹 Título */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <AssessmentIcon sx={{ fontSize: 36, color: "#6a1b9a" }} />
        <Typography variant="h4" fontWeight={500} sx={{ letterSpacing: "0.5px" }}>
          Gestión de Pedidos
        </Typography>
      </Box>

      {/* 🔹 Cards resumen */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: "#e3f2fd",
              borderRadius: 3,
              boxShadow: 2,
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
              transition: "all 0.3s ease",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PeopleIcon sx={{ fontSize: 32, color: "#1976d2" }} />
                <Box>
                  <Typography variant="h6">Clientes</Typography>
                  <Typography variant="h4">{cantidadClientes}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: "#fff3e0",
              borderRadius: 3,
              boxShadow: 2,
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
              transition: "all 0.3s ease",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ShoppingCartIcon sx={{ fontSize: 32, color: "#f57c00" }} />
                <Box>
                  <Typography variant="h6">Pedidos</Typography>
                  <Typography variant="h4">{cantidadPedidos}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: "#f3e5f5",
              borderRadius: 3,
              boxShadow: 2,
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
              transition: "all 0.3s ease",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AssessmentIcon sx={{ fontSize: 32, color: "#6a1b9a" }} />
                <Box>
                  <Typography variant="h6">Estados</Typography>
                  <Grid container spacing={1}>
                    {Object.entries(estadosCount).map(([estado, count]) => (
                      <Grid item xs={6} key={estado}>
                        <Typography variant="body2">
                          {estado}: <b>{count}</b>
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabla en escritorio, cards en móvil */}
      <Box>
        {isSmUp ? (
          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Paper} sx={{ minWidth: 650 }}>
              <Table sx={{ minWidth: 900 }}>
                <TableHead sx={{ bgcolor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Cliente</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Total</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o._id}>
                      <TableCell>{o.user?.username || "N/A"}</TableCell>
                      <TableCell>{o.user?.email || "N/A"}</TableCell>
                      <TableCell>
                        {Number(o.total || 0).toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o._id, e.target.value)}
                          size="small"
                          sx={{ minWidth: { xs: 140, sm: 170 }, bgcolor: "#fff" }}
                        >
                          {estados.map((estado) => (
                            <MenuItem key={estado} value={estado}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Chip label={estado} color={getStatusColor(estado)} size="small" />
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {orders.map((o) => (
              <Grid item xs={12} key={o._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6">{o.user?.username || 'N/A'}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{o.user?.email || 'N/A'}</Typography>
                        </Box>
                        <Typography variant="subtitle1">{Number(o.total || 0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Typography>
                      </Box>

                      <Box>
                        <Select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o._id, e.target.value)}
                          size="small"
                          fullWidth
                          sx={{ bgcolor: '#fff' }}
                        >
                          {estados.map((estado) => (
                            <MenuItem key={estado} value={estado}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip label={estado} color={getStatusColor(estado)} size="small" />
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
}

export default AdminOrders;
















