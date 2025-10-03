import React, { useEffect } from "react";
import { Typography, Box, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BusinessIcon from "@mui/icons-material/Business";
import StoreIcon from "@mui/icons-material/Store";
import DescriptionIcon from "@mui/icons-material/Description";
import WarehouseIcon from "@mui/icons-material/Warehouse";

import { useUserStore } from "../../store/useUserStore";
import { useOrderStore } from "../../store/useOrderStore";
import { useProductStore } from "../../store/useProductStore";
import { useClienteStore } from "../../store/useClienteStore";
import { useProveedorStore } from "../../store/useProveedorStore";
import { useDocumentoStore } from "../../store/useDocumentoStore";

function AdminDashboard() {
  const { users, fetchUsers, loading: loadingUsers } = useUserStore();
  const { orders, fetchOrders, loading: loadingOrders } = useOrderStore();
  const { products, fetchProducts, loading: loadingProducts } = useProductStore();
  const { clientes, fetchClientes, loading: loadingClientes } = useClienteStore();
  const { proveedores, fetchProveedores, loading: loadingProveedores } = useProveedorStore();
  const { documentos, fetchDocumentos, loading: loadingDocumentos } = useDocumentoStore();

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
    fetchClientes();
    fetchProveedores();
    fetchDocumentos();
  }, [fetchUsers, fetchOrders, fetchProducts, fetchClientes, fetchProveedores, fetchDocumentos]);

  if (
    loadingUsers ||
    loadingOrders ||
    loadingProducts ||
    loadingClientes ||
    loadingProveedores ||
    loadingDocumentos
  ) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 🔹 Suma total de stock de todos los productos
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);

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
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#e3f2fd", borderRadius: 3, boxShadow: 2, transition: "all 0.3s ease",
                      "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PeopleIcon sx={{ fontSize: 32, color: "#1976d2" }} />
                <Box>
                  <Typography variant="h6">Clientes</Typography>
                  <Typography variant="h4">{clientes.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Proveedores */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#fce4ec", borderRadius: 3, boxShadow: 2, transition: "all 0.3s ease",
                      "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <StoreIcon sx={{ fontSize: 32, color: "#c2185b" }} />
                <Box>
                  <Typography variant="h6">Proveedores</Typography>
                  <Typography variant="h4">{proveedores.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Usuarios */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#ede7f6", borderRadius: 3, boxShadow: 2, transition: "all 0.3s ease",
                      "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <BusinessIcon sx={{ fontSize: 32, color: "#512da8" }} />
                <Box>
                  <Typography variant="h6">Usuarios</Typography>
                  <Typography variant="h4">{users.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pedidos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#fff3e0", borderRadius: 3, boxShadow: 2, transition: "all 0.3s ease",
                      "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ShoppingCartIcon sx={{ fontSize: 32, color: "#f57c00" }} />
                <Box>
                  <Typography variant="h6">Pedidos</Typography>
                  <Typography variant="h4">{orders.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Productos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#f8bbd0", borderRadius: 3, boxShadow: 2, transition: "all 0.3s ease",
                      "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <InventoryIcon sx={{ fontSize: 32, color: "#c2185b" }} />
                <Box>
                  <Typography variant="h6">Productos</Typography>
                  <Typography variant="h4">{products.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Almacén (suma de stock total) */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#e0f7fa", borderRadius: 3, boxShadow: 2, transition: "all 0.3s ease",
                      "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <WarehouseIcon sx={{ fontSize: 32, color: "#00796b" }} />
                <Box>
                  <Typography variant="h6">Almacén</Typography>
                  <Typography variant="h4">{totalStock}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Documentos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "#c8e6c9", borderRadius: 3, boxShadow: 2, transition: "all 0.3s ease",
                      "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <DescriptionIcon sx={{ fontSize: 32, color: "#2e7d32" }} />
                <Box>
                  <Typography variant="h6">Documentos</Typography>
                  <Typography variant="h4">{documentos.length}</Typography>
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

















