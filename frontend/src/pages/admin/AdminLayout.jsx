import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StoreIcon from "@mui/icons-material/Store";
import DescriptionIcon from "@mui/icons-material/Description"; // 📄 Documentos
import GroupIcon from "@mui/icons-material/Group"; // 👥 Clientes
import BusinessIcon from "@mui/icons-material/Business"; // 🏢 Proveedores

import { useAuthStore } from "../../store/useAuthStore";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 240;

function AdminLayout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setMobileOpen(false);
    logout();
    navigate("/login");
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Itelsa Admin
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem button component={Link} to="/" onClick={() => setMobileOpen(false)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Página Principal" />
          </ListItem>

          <ListItem button component={Link} to="/admin" onClick={() => setMobileOpen(false)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button component={Link} to="/admin/products" onClick={() => setMobileOpen(false)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItem>

          <ListItem button component={Link} to="/admin/catalog" onClick={() => setMobileOpen(false)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Almacén" />
          </ListItem>

          <ListItem button component={Link} to="/admin/orders" onClick={() => setMobileOpen(false)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItem>

          <ListItem button component={Link} to="/admin/users" onClick={() => setMobileOpen(false)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItem>

          {/* ✅ NUEVOS */}
          <ListItem button component={Link} to="/admin/documentos" onClick={() => setMobileOpen(false)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Documentos" />
          </ListItem>

          <ListItem button component={Link} to="/admin/clientes" onClick={() => setMobileOpen(false)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItem>

          <ListItem button component={Link} to="/admin/proveedores" onClick={() => setMobileOpen(false)}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Proveedores" />
          </ListItem>

          <ListItem button onClick={() => { setMobileOpen(false); handleLogout(); }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      {isSmUp ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "#1e293b",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "#1e293b",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Contenido */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#e8f5e9" }}>
        <AppBar
          position="fixed"
          sx={{
            width: isSmUp ? `calc(100% - ${drawerWidth}px)` : "100%",
            ml: isSmUp ? `${drawerWidth}px` : 0,
            bgcolor: "#1976d2",
          }}
        >
          <Toolbar>
            {!isSmUp && (
              <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 2 }}>
                <DashboardIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap>
              Panel de Administración
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;






