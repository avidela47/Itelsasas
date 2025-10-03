// src/components/ProductCarousel.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import LabelIcon from "@mui/icons-material/Label";
import FactoryIcon from "@mui/icons-material/Factory";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import "swiper/css";

// Resolver imagen igual que en CatalogPage
const resolveImage = (photo) => {
  if (!photo) return "/placeholder.png";
  const cleanName = photo.split("\\").pop().split("/").pop();
  if (cleanName.startsWith("http")) return cleanName;
  return `/product/${cleanName}`;
};

function ProductCarousel({ products = [] }) {
  const navigate = useNavigate();

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={12}
      loop={true}
      autoplay={{
        delay: 2000,
        reverseDirection: true,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      }}
    >
      {products.map((p) => (
        <SwiperSlide key={p._id}>
          <Card
            onClick={() => navigate(`/product/${p._id}`)}
            sx={{
              position: "relative", // para la textura ::before
              minWidth: { xs: 260, sm: 300 },
              maxWidth: { xs: 320, sm: 340 },
              height: 140,
              borderRadius: 3,
              // 🧊 Negro esmerilado (más oscuro) + glass
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.46) 100%)",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(6px) saturate(130%)",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.52) 100%)",
              },
              transition: "all 0.25s ease",
              // 🎛️ Textura sutil tipo granulado (esmerilado)
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: 12,
                pointerEvents: "none",
                // patrón de puntitos muy leves (no tapa el contenido)
                background:
                  "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "4px 4px",
                opacity: 0.35,
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: 90, sm: 110, md: 120 },
                objectFit: "contain",
                // leve base clara para que el producto destaque sobre el esmerilado
                bgcolor: "rgba(255,255,255,0.10)",
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
              }}
              image={resolveImage(p.photo)}
              alt={p.name}
            />

            <CardContent
              sx={{
                textAlign: "left",
                p: 1,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                bgcolor: "transparent",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LabelIcon sx={{ fontSize: 16, color: "#ff5252" }} />
                <Typography variant="caption" fontWeight={600} sx={{ color: "#fff" }}>
                  {p.code || "SIN CÓDIGO"}
                </Typography>
              </Box>

              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{
                  color: "#fff",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {p.name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ color: "#2ecc71" }}>
                  ${p.priceUSD}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                  <LocalOfferIcon sx={{ fontSize: 16, color: "red" }} />
                  <Typography variant="caption" fontWeight={600} sx={{ color: "red" }}>
                    10% OFF
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                {p.brand && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                    <FactoryIcon sx={{ fontSize: 14, color: "#bbb" }} />
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      {p.brand}
                    </Typography>
                  </Box>
                )}
                {(p.category || p.rubro) && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                    <CategoryIcon sx={{ fontSize: 14, color: "#bbb" }} />
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      {p.category || p.rubro}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ProductCarousel;







