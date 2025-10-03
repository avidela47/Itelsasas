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

// Imagen del robot
import robotImg from "../assets/Chatbot.png";

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

  // estilo verde institucional (responsivo)
  const itelsaBtn = {
    bgcolor: "#25D366",
    color: "white",
    "&:hover": { bgcolor: "#1ebe5a" },
    textTransform: "none",
    fontSize: { xs: "0.78rem", sm: "0.82rem", md: "0.88rem" },
    py: { xs: 0.5, sm: 0.7 },
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 16, sm: 20 },
        right: { xs: 16, sm: 20 },
        zIndex: 2000,
      }}
    >
      <Paper
        sx={{
          p: { xs: 1.25, sm: 2, md: 2.25 },
          borderRadius: 3,
          width: { xs: 240, sm: 260, md: 280 },   // 👈 más angosto y responsivo
          maxWidth: "100%",
          bgcolor: "rgba(46, 46, 46, 0.9)",
          color: "white",
          boxShadow: 6,
          position: "relative",
          maxHeight: 520,
          overflowY: "auto",
        }}
      >
        {/* Botón cerrar */}
        <IconButton
          size="small"
          onClick={() => setVisible(false)}
          sx={{ position: "absolute", top: 6, right: 6, color: "white" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 1, sm: 1.25 } }}>
          <Box
            component="img"
            src={robotImg}
            alt="Itelsa Bot"
            loading="lazy"
            decoding="async"
            sx={{
              width: { xs: 88, sm: 100, md: 116 },   // leve ajuste para no invadir el ancho
              height: { xs: 88, sm: 100, md: 116 },
              borderRadius: { xs: 16, sm: 18, md: 20 },
              display: "inline-block",
            }}
          />
          <Typography
            sx={{
              mt: 0.5,
              fontWeight: 700,
              fontSize: { xs: "0.88rem", sm: "0.94rem", md: "0.98rem" },
              lineHeight: 1.1,
              wordBreak: "break-word",
            }}
          >
            Itelsa Bot
          </Typography>
        </Box>

        {/* ================= VISTA PRINCIPAL ================= */}
        {view === "main" && (
          <>
            <Typography
              align="center"
              sx={{
                mb: { xs: 1.4, sm: 1.8 },
                fontSize: { xs: "0.86rem", sm: "0.92rem" },
              }}
            >
              Soy el asistente de <strong>Itelsa SAS</strong>. ¿En qué puedo ayudarte?
            </Typography>

            <Stack spacing={{ xs: 0.8, sm: 1 }}>
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
              <Box sx={{ mt: { xs: 1.4, sm: 1.8 }, textAlign: "center" }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.84rem", sm: "0.9rem" },
                  }}
                >
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
            <Typography
              align="center"
              sx={{
                mb: { xs: 1.4, sm: 1.8 },
                fontWeight: 700,
                fontSize: { xs: "0.98rem", sm: "1.06rem", md: "1.1rem" },
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Typography>

            {products[category].map((p, i) => {
              const Icon = p.icon;
              return (
                <Box
                  key={i}
                  sx={{
                    mb: 1,
                    p: { xs: 1, sm: 1.1 },
                    border: "1px solid #666",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  <Icon sx={{ color: "#25D366", fontSize: { xs: 18, sm: 20 } }} />
                  <Box
                    component="img"
                    src={p.img}
                    alt={p.code}
                    loading="lazy"
                    decoding="async"
                    sx={{ width: { xs: 38, sm: 42 }, height: { xs: 38, sm: 42 }, borderRadius: 1 }}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontSize: { xs: "0.83rem", sm: "0.88rem" }, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {p.code}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: "0.78rem", sm: "0.84rem" }, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {p.desc}
                    </Typography>
                    <Typography
                      sx={{ fontSize: { xs: "0.86rem", sm: "0.9rem" }, fontWeight: "bold", color: "#25D366" }}
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
                mt: { xs: 1.4, sm: 1.8 },
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
















