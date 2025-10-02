// src/pages/admin/AdminDashboard.jsx
import React, { useEffect } from "react";
import { Typography, Box, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useUserStore } from "../../store/useUserStore";
import { useOrderStore } from "../../store/useOrderStore";
import { useProductStore } from "../../store/useProductStore";

function AdminDashboard() {
  const { users, fetchUsers, loading: loadingUsers } = useUserStore();
  const { orders, fetchOrders, loading: loadingOrders } = useOrderStore();
  const { products, fetchProducts, loading: loadingProducts } = useProductStore();

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, [fetchUsers, fetchOrders, fetchProducts]);

  if (loadingUsers || loadingOrders || loadingProducts) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  const cantidadClientes = users.length;
  const cantidadPedidos = orders.length;
  const cantidadProductos = products.length;

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <AssessmentIcon sx={{ fontSize: 36, color: "#6a1b9a" }} />
        <Typography variant="h4" fontWeight={500} sx={{ letterSpacing: "0.5px" }}>
          Panel de Administración
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {/* Clientes */}
        <Grid item xs={12} sm={4} md={3}>
          <Card sx={{ bgcolor: "#e3f2fd", borderRadius: 3, boxShadow: 2, transition: "all 0.3s ease", "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
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

        {/* Pedidos */}
        <Grid item xs={12} sm={4} md={3}>
          <Card sx={{ bgcolor: "#fff3e0", borderRadius: 3, boxShadow: 2, transition: "all 0.3s ease", "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
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

        {/* Productos */}
        <Grid item xs={12} sm={4} md={3}>
          <Card sx={{ bgcolor: "#fce4ec", borderRadius: 3, boxShadow: 2, transition: "all 0.3s ease", "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <InventoryIcon sx={{ fontSize: 32, color: "#c2185b" }} />
                <Box>
                  <Typography variant="h6">Productos</Typography>
                  <Typography variant="h4">{cantidadProductos}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminDashboard;








