// src/components/intro/BenefitsSection.jsx
import React from "react";
import { Grid, Box, Typography, Paper } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";

const benefits = [
  {
    icon: <BuildIcon sx={{ fontSize: 50, color: "primary.main" }} />,
    title: "Soporte Técnico",
    desc: "Atención especializada en sensores e iluminación.",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 50, color: "success.main" }} />,
    title: "Envíos Nacionales",
    desc: "Llevamos tu compra a cualquier punto del país.",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 50, color: "warning.main" }} />,
    title: "Marcas Líderes",
    desc: "Trabajamos solo con fabricantes reconocidos.",
  },
];

function BenefitsSection() {
  return (
    <Box id="benefits" sx={{ py: 8, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        ¿Por qué elegirnos?
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {benefits.map((b, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                height: "100%",
              }}
            >
              {b.icon}
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {b.title}
              </Typography>
              <Typography>{b.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BenefitsSection;
