// src/components/ChatBot.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import robotImg from "../assets/icon.png";
import { products } from "../data/products";

function ChatBot() {
  const [visible, setVisible] = useState(true);
  const [response, setResponse] = useState("");
  const [category, setCategory] = useState(null);
  const [view, setView] = useState("main");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 60000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const handleOptionClick = (option) => {
    switch (option) {
      case "sensores":
        setResponse("🔍 Los sensores que trabajamos incluyen fotoeléctricos, inductivos y barreras.");
        setCategory("sensores");
        break;
      case "fuentes":
        setResponse("⚡ Tenemos fuentes MEAN WELL de 5V, 12V, 24V y más.");
        setCategory("fuentes");
        break;
      case "accesorios":
        setResponse("🔧 Contamos con soportes, conectores y cables industriales para sensores y fuentes.");
        setCategory("accesorios");
        break;
      case "contacto":
        setResponse("📞 Un asesor de Itelsa te puede contactar. Dejanos tu nombre y WhatsApp o escribinos por WhatsApp directamente.");
        setCategory(null);
        break;
      default:
        setResponse("");
        setCategory(null);
    }
    setView("main");
  };

  // estilo verde institucional
  const itelsaBtn = {
    bgcolor: "#25D366",
    color: "white",
    "&:hover": { bgcolor: "#1ebe5a" },
    textTransform: "none",
    fontSize: "0.75rem",
    py: 0.5,
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 2000,
      }}
    >
      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          width: 280,
          bgcolor: "rgba(46, 46, 46, 0.9)",
          color: "white",
          boxShadow: 6,
          position: "relative",
          maxHeight: 480,
          overflowY: "auto",
        }}
      >
        {/* Botón cerrar */}
        <IconButton
          size="small"
          onClick={() => setVisible(false)}
          sx={{ position: "absolute", top: 5, right: 5, color: "white" }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <img
            src={robotImg}
            alt="Chatbot Robot"
            loading="lazy"
            decoding="async"
            style={{ width: 60, height: 60, borderRadius: "50%" }}
          />
          <Typography variant="h6" fontWeight={700}>
            Itelsa Bot
          </Typography>
        </Box>

        {/* ================= VISTA PRINCIPAL ================= */}
        {view === "main" && (
          <>
            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
              Soy el asistente de <strong>Itelsa SAS</strong>. ¿En qué puedo ayudarte?
            </Typography>

            <Stack spacing={1}>
              <Button size="small" onClick={() => handleOptionClick("sensores")} sx={itelsaBtn}>
                Sensores
              </Button>
              <Button size="small" onClick={() => handleOptionClick("fuentes")} sx={itelsaBtn}>
                Fuentes
              </Button>
              <Button size="small" onClick={() => handleOptionClick("accesorios")} sx={itelsaBtn}>
                Accesorios
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleOptionClick("contacto")}
                sx={{
                  ...itelsaBtn,
                  bgcolor: "transparent",
                  border: "1px solid #25D366",
                  color: "#25D366",
                  "&:hover": { bgcolor: "rgba(37,211,102,0.1)" },
                }}
              >
                Contacto Humano
              </Button>
            </Stack>

            {response && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" align="center" sx={{ mb: 1 }}>
                  {response}
                </Typography>

                {/* Botón Ver producto */}
                {category && (
                  <Button
                    size="small"
                    onClick={() => setView("products")}
                    sx={{
                      ...itelsaBtn,
                      bgcolor: "transparent",
                      border: "1px solid #25D366",
                      color: "#25D366",
                      "&:hover": { bgcolor: "rgba(37,211,102,0.1)" },
                    }}
                  >
                    Ver producto
                  </Button>
                )}

                {/* Botón WhatsApp SOLO si es contacto */}
                {response.includes("asesor de Itelsa") && (
                  <Button
                    size="small"
                    startIcon={<WhatsAppIcon />}
                    sx={itelsaBtn}
                    href="https://wa.me/5493515551234"
                    target="_blank"
                  >
                    WhatsApp
                  </Button>
                )}
              </Box>
            )}
          </>
        )}

        {/* ================= VISTA PRODUCTOS ================= */}
        {view === "products" && category && (
          <>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Typography>

            {products[category].map((p, i) => {
              const Icon = p.icon;
              return (
                <Box
                  key={i}
                  sx={{
                    mb: 1,
                    p: 1,
                    border: "1px solid #666",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  <Icon sx={{ color: "#25D366" }} />
                  <img
                    src={p.img}
                    alt={p.code}
                    loading="lazy"
                    decoding="async"
                    style={{ width: 40, height: 40, borderRadius: 4 }}
                  />
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {p.code}
                    </Typography>
                    <Typography variant="body2">{p.desc}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "#25D366" }}
                    >
                      ${p.price}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {/* Botón volver */}
            <Button
              fullWidth
              sx={{
                ...itelsaBtn,
                bgcolor: "transparent",
                border: "1px solid #25D366",
                color: "#25D366",
                mt: 2,
                "&:hover": { bgcolor: "rgba(37,211,102,0.1)" },
              }}
              onClick={() => setView("main")}
            >
              ⬅ Volver
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default ChatBot;












