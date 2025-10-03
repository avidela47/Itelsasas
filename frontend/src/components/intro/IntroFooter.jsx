// src/components/intro/IntroFooter.jsx
import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";

function IntroFooter() {
  return (
    <Box
      sx={{
        bgcolor: "#212121",
        color: "white",
        py: 4,
        px: { xs: 2, md: 6 },
        mt: 6,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Logo + Slogan */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            ITELSA
          </Typography>
          <Typography variant="body2">
            Soluciones industriales en sensores, iluminación y automatización.
          </Typography>
        </Grid>

        {/* Datos de contacto */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Contacto
          </Typography>
          <Typography variant="body2">📍 Córdoba, Argentina</Typography>
          <Typography variant="body2">📞 351-2890110</Typography>
          <Typography variant="body2">✉️ info@itelsa.com</Typography>
        </Grid>

        {/* Links rápidos */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Enlaces
          </Typography>
          <Link href="/catalog" color="inherit" underline="hover" display="block">
            E-commerce
          </Link>
          <Link
            href="https://wa.me/5493512890110"
            target="_blank"
            color="inherit"
            underline="hover"
            display="block"
          >
            WhatsApp
          </Link>
          <Link
            href="https://ariel-portfolio-indol.vercel.app/"
            target="_blank"
            color="inherit"
            underline="hover"
            display="block"
          >
            Portfolio
          </Link>
        </Grid>
      </Grid>

      {/* Línea inferior */}
      <Box sx={{ textAlign: "center", mt: 4, borderTop: "1px solid #444", pt: 2 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} ITELSA · Todos los derechos reservados
        </Typography>
      </Box>
    </Box>
  );
}

export default IntroFooter;
