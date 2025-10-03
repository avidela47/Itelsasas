// src/components/intro/IntroNavbar.jsx
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";

function IntroNavbar() {
  const [elevate, setElevate] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setElevate(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "Beneficios", to: "benefits" },
    { label: "Productos", to: "featured" },
    { label: "Contacto", to: "contact" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: elevate ? "rgba(25, 118, 210, 0.95)" : "transparent",
          boxShadow: elevate ? 2 : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer", letterSpacing: 2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ITELSA
          </Typography>

          {/* Links Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {menuItems.map((item, i) => (
              <ScrollLink
                key={i}
                to={item.to}
                smooth
                duration={600}
                style={{ cursor: "pointer" }}
              >
                <Typography>{item.label}</Typography>
              </ScrollLink>
            ))}
          </Box>

          {/* Botón desktop */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/catalog")}
            >
              Entrar a la Tienda
            </Button>
          </Box>

          {/* Menú Hamburguesa (Mobile) */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              color="inherit"
              edge="end"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {menuItems.map((item, i) => (
              <ScrollLink
                key={i}
                to={item.to}
                smooth
                duration={600}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={toggleDrawer(false)}
              >
                <ListItem button>
                  <ListItemText primary={item.label} />
                </ListItem>
              </ScrollLink>
            ))}
            <ListItem button onClick={() => navigate("/catalog")}>
              <ListItemText primary="Entrar a la Tienda" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default IntroNavbar;
