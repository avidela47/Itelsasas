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
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <img src={logo} alt="Logo" loading="lazy" decoding="async" width={120} height={80} style={{ objectFit: "contain" }} />
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Casa central
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ whiteSpace: "nowrap", display: 'flex', alignItems: 'center', gap: 1 }} // 🔹 evita salto de línea
                >
                  <LocationOnIcon sx={{ fontSize: { xs: 28, md: 24 }, color: '#1976d2' }} />
                  Dirección: Calle Falsa 123, Córdoba
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ fontSize: { xs: 28, md: 24 }, color: '#ffca28' }} />
                  Tel: +54 351 555-1234
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: { xs: 28, md: 24 }, color: '#8e24aa' }} />
                  Email: contacto@itelsa.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Redes sociales */}
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="body1" fontWeight={600} gutterBottom>
              Seguinos en redes
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#E1306C", width: { xs: 46, md: 40 }, height: { xs: 46, md: 40 } }}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://wa.me/5493515551234"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#25D366", width: { xs: 46, md: 40 }, height: { xs: 46, md: 40 } }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "red", width: { xs: 46, md: 40 }, height: { xs: 46, md: 40 } }}
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "white", width: { xs: 46, md: 40 }, height: { xs: 46, md: 40 } }}
                aria-label="TikTok"
              >
                <TikTokIcon />
              </IconButton>
            </Box>
            {/* Envíos - estilo con onda */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
              <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: { xs: 96, md: 72 }, height: { xs: 64, md: 48 }, transition: 'transform 180ms ease', '&:hover': { transform: 'translateY(-3px)' } }}>
                  <img
                    src="/entrega.png"
                    alt="Imagen de entrega"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      background: 'transparent',
                      // transform dark/black parts towards red
                      filter: 'invert(12%) sepia(100%) saturate(8000%) hue-rotate(345deg) brightness(0.95) contrast(1.02)'
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-start' } }}>
                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1 }}>
                  Envíos a todo el país
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                  Cobertura nacional
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "right" }}>
            <Typography variant="caption" color="gray">
              © {new Date().getFullYear()} Itelsa sas - Todos los derechos reservados.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;






