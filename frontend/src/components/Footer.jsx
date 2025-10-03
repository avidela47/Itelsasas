// src/components/Footer.jsx
import React from "react";
import { Box, Container, Typography, IconButton, Grid } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TikTokIcon from "@mui/icons-material/MusicNote";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import logo from "../assets/BROCHURE ITELSA - BLANCO Y NEGRO.png";

function Footer() {
  // estilo de subrayado verde “glass” reutilizable
  const underlineGreen = {
    position: "relative",
    display: "inline-block",
    px: 0.5,
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -4,
      height: 2,
      width: "100%",
      borderRadius: 2,
      // mismo degradado usado en “Casa central”
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.75) 0%, rgba(0,150,80,0.9) 100%)",
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform 200ms ease",
    },
    "&:hover::after": {
      transform: "scaleX(1)",
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "rgba(40, 40, 40, 0.6)",
        color: "white",
        py: 4,
        mt: 6,
        borderTop: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Logo + datos de contacto */}
          <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "left" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2.5,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Logo Itelsa"
                loading="lazy"
                decoding="async"
                sx={{
                  width: { xs: 140, md: 160 },
                  height: { xs: 96, md: 108 },
                  objectFit: "contain",
                  transition: "transform 180ms ease, filter 180ms ease",
                  willChange: "transform, filter",
                  ml: { xs: -1, md: -1.5 }, // corrido a la izquierda también en mobile
                  "&:hover": {
                    transform: "translateY(-2px) scale(1.05)",
                    filter: "drop-shadow(0 0 12px rgba(0,150,80,0.45))", // glow verde
                  },
                }}
              />
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                {/* Título con subrayado glass en hover */}
                <Typography
                  variant="h6"
                  fontWeight={700}
                  align="center"
                  sx={underlineGreen}
                >
                  Casa central
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: 1,
                  }}
                >
                  <LocationOnIcon
                    sx={{
                      fontSize: { xs: 28, md: 24 },
                      color: "#1976d2",
                      transition: "transform 160ms ease, filter 160ms ease",
                      "&:hover": {
                        transform: "translateY(-2px) scale(1.08)",
                        filter: "drop-shadow(0 0 8px rgba(25,118,210,0.6))",
                      },
                    }}
                  />
                  Dirección: Calle Falsa 123, Córdoba
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: 1,
                  }}
                >
                  <PhoneIcon
                    sx={{
                      fontSize: { xs: 28, md: 24 },
                      color: "#ffca28",
                      transition: "transform 160ms ease, filter 160ms ease",
                      "&:hover": {
                        transform: "translateY(-2px) scale(1.08)",
                        filter: "drop-shadow(0 0 8px rgba(255,202,40,0.6))",
                      },
                    }}
                  />
                  Tel: +54 351 555-1234
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: 1,
                  }}
                >
                  <EmailIcon
                    sx={{
                      fontSize: { xs: 28, md: 24 },
                      color: "#8e24aa",
                      transition: "transform 160ms ease, filter 160ms ease",
                      "&:hover": {
                        transform: "translateY(-2px) scale(1.08)",
                        filter: "drop-shadow(0 0 8px rgba(142,36,170,0.6))",
                      },
                    }}
                  />
                  Email: contacto@itelsa.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* (Centro) Info de envíos */}
          <Grid item xs={12} md={4} textAlign="center">
            <Typography
              variant="body1"
              fontWeight={600}
              gutterBottom
              sx={underlineGreen} // ⬅️ mismo subrayado
            >
              Envíos a todo el país
            </Typography>

            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: { xs: 96, md: 92 },
                    height: { xs: 64, md: 60 },
                    transition: "transform 180ms ease",
                    "&:hover": { transform: "translateY(-3px)" },
                  }}
                >
                  <img
                    src="/entrega.png"
                    alt="Imagen de entrega"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      background: "transparent",
                      filter:
                        "invert(12%) sepia(100%) saturate(8000%) hue-rotate(345deg) brightness(0.95) contrast(1.02)",
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "flex-start", md: "flex-start" },
                }}
              >
                <Typography variant="body2" sx={{ color: "#fff", fontWeight: 700, lineHeight: 1 }}>
                  Cobertura nacional
                </Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)" }}>
                  Entregas rápidas
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* (Derecha) Redes más grandes y centradas con el título */}
          <Grid item xs={12} md={4} textAlign="center">
            <Typography
              variant="body1"
              fontWeight={700}
              gutterBottom
              sx={underlineGreen} // ⬅️ mismo subrayado
            >
              Seguinos en redes
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 1.75, md: 2 },
                mb: 0.5,
              }}
            >
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#E1306C",
                  width: { xs: 64, md: 60 },
                  height: { xs: 64, md: 60 },
                  transition: "transform 160ms ease, filter 160ms ease",
                  "&:hover": {
                    transform: "translateY(-2px) scale(1.07)",
                    filter: "drop-shadow(0 0 10px rgba(225,48,108,0.6))",
                  },
                }}
                aria-label="Instagram"
              >
                <InstagramIcon sx={{ fontSize: { xs: 34, md: 32 } }} />
              </IconButton>

              <IconButton
                component="a"
                href="https://wa.me/5493515551234"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#25D366",
                  width: { xs: 64, md: 60 },
                  height: { xs: 64, md: 60 },
                  transition: "transform 160ms ease, filter 160ms ease",
                  "&:hover": {
                    transform: "translateY(-2px) scale(1.07)",
                    filter: "drop-shadow(0 0 10px rgba(37,211,102,0.6))",
                  },
                }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon sx={{ fontSize: { xs: 34, md: 32 } }} />
              </IconButton>

              <IconButton
                component="a"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "red",
                  width: { xs: 64, md: 60 },
                  height: { xs: 64, md: 60 },
                  transition: "transform 160ms ease, filter 160ms ease",
                  "&:hover": {
                    transform: "translateY(-2px) scale(1.07)",
                    filter: "drop-shadow(0 0 10px rgba(255,0,0,0.6))",
                  },
                }}
                aria-label="YouTube"
              >
                <YouTubeIcon sx={{ fontSize: { xs: 34, md: 32 } }} />
              </IconButton>

              <IconButton
                component="a"
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  width: { xs: 64, md: 60 },
                  height: { xs: 64, md: 60 },
                  transition: "transform 160ms ease, filter 160ms ease",
                  "&:hover": {
                    transform: "translateY(-2px) scale(1.07)",
                    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.55))",
                  },
                }}
                aria-label="TikTok"
              >
                <TikTokIcon sx={{ fontSize: { xs: 34, md: 32 } }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright al pie, abajo de todo */}
        <Box sx={{ mt: 3.5, textAlign: "center" }}>
          <Typography variant="caption" color="gray">
            © 2025 Itelsa sas - Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;















