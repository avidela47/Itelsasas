// src/components/intro/IntroHero.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function IntroHero() {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: "relative", height: "100vh", width: "100%" }}>
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/intro-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
        }}
      />

      {/* Contenido */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          ITELSA
        </Typography>
        <Typography variant="h5" sx={{ maxWidth: "700px", mb: 4 }}>
          Sensores, iluminación y soluciones industriales para todo el país
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/catalog")}
        >
          Entrar al E-commerce
        </Button>
      </Box>
    </Box>
  );
}

export default IntroHero;
