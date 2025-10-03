// src/components/intro/ContactSection.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

function ContactSection() {
  return (
    <Box id="contact" sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Contactanos
      </Typography>
      <Typography sx={{ mb: 3 }}>
        📞 351-2890110 · ✉️ info@itelsa.com · Córdoba, Argentina
      </Typography>
      <Button
        variant="contained"
        color="success"
        href="https://wa.me/5493512890110"
        target="_blank"
      >
        WhatsApp Directo
      </Button>
    </Box>
  );
}

export default ContactSection;

