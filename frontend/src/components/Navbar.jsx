import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Badge,
  Divider,
} from "@mui/material";
import { ShoppingCart, ExitToApp, ListAlt, Menu } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import itelsaLogo from "../assets/BROCHURE ITELSA - BLANCO Y NEGRO.png";

function Navbar() {
  const { user, logout, isAdmin } = useAuthStore();
  const { items } = useCartStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { label: "Catálogo", to: "/catalogo" },
    { label: "Carrito", to: "/cart" },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "transparent !important",
        boxShadow: "none !important",
        backgroundImage: "none !important",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo Itelsa */}
        <Box
          component={Link}
          to="/"
          sx={{ display: "flex", alignItems: "center", cursor: "pointer", textDecoration: 'none' }}
          aria-label="Ir al inicio"
        >
          <Box
            component="img"
            src={itelsaLogo}
            alt="Itelsa Logo"
            loading="lazy"
            decoding="async"
            width={160}
            height={48}
            sx={{
              height: { xs: 36, sm: 44, md: 56 },
              maxWidth: "100%",
              transition: "all 0.3s ease-in-out",
            }}
          />
        </Box>

        {/* Desktop menu */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 2 }}>
          <Button sx={{ color: "#fff" }} component={Link} to="/catalogo">
            Catálogo
          </Button>

          <IconButton sx={{ color: "#fff" }} component={Link} to="/cart">
            <Badge badgeContent={items.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <>
              <Typography
                variant="body2"
                sx={{ mr: 2, fontWeight: "bold", color: "#fff" }}
              >
                Hola, {user.username}
              </Typography>

              {isAdmin() ? (
                <Button sx={{ color: "#fff" }} component={Link} to="/admin">
                  Admin Panel
                </Button>
              ) : (
                <Button
                  sx={{ color: "#fff" }}
                  component={Link}
                  to="/orders/my"
                  startIcon={<ListAlt />}
                >
                  Mis Pedidos
                </Button>
              )}

              <IconButton sx={{ color: "#fff" }} onClick={handleLogout}>
                <ExitToApp />
              </IconButton>
            </>
          ) : (
            <>
              <Button sx={{ color: "#fff" }} component={Link} to="/login">
                Login
              </Button>
              <Button sx={{ color: "#fff" }} component={Link} to="/register">
                Registro
              </Button>
            </>
          )}
        </Box>

        {/* Mobile menu button */}
        <Box sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}>
          <IconButton sx={{ color: "#fff" }} component={Link} to="/cart" aria-label="Ir al carrito">
            <Badge badgeContent={items.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: "#fff" }} onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu />
          </IconButton>
        </Box>

        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(0,0,0,0.75)',
              color: '#fff',
              width: 280,
              backdropFilter: 'blur(6px)',
              borderRadius: 2,
              px: 1,
              boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
            },
          }}
        >
          <Box sx={{ width: 260, p: 1 }} role="presentation">
            <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
              <Box component="img" src={itelsaLogo} alt="logo" sx={{ height: 40 }} />
            </Box>
            <Divider />
            <List>
              {menuItems.map((mi) => (
                <ListItemButton key={mi.to} component={Link} to={mi.to} onClick={() => setOpen(false)}>
                  <ListItemText primary={mi.label} primaryTypographyProps={{ color: '#fff' }} />
                </ListItemButton>
              ))}

              {user ? (
                <>
                  <ListItemButton component={Link} to={isAdmin() ? "/admin" : "/orders/my"} onClick={() => setOpen(false)}>
                    <ListItemText primary={isAdmin() ? "Admin Panel" : "Mis Pedidos"} primaryTypographyProps={{ color: '#fff' }} />
                  </ListItemButton>
                  <ListItemButton onClick={() => { setOpen(false); handleLogout(); }}>
                    <ListItemText primary="Cerrar sesión" primaryTypographyProps={{ color: '#fff' }} />
                  </ListItemButton>
                </>
              ) : (
                <>
                  <ListItemButton component={Link} to="/login" onClick={() => setOpen(false)}>
                    <ListItemText primary="Login" primaryTypographyProps={{ color: '#fff' }} />
                  </ListItemButton>
                  <ListItemButton component={Link} to="/register" onClick={() => setOpen(false)}>
                    <ListItemText primary="Registro" primaryTypographyProps={{ color: '#fff' }} />
                  </ListItemButton>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
















