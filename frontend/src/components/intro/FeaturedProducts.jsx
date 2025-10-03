// src/components/intro/FeaturedProducts.jsx
import React from "react";
import { Typography, Box, Card, CardMedia, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const products = [
  { name: "Sensor Optex", img: "/product/optex.png" },
  { name: "Final de Carrera Pizzato", img: "/product/pizzato.png" },
  { name: "Lámpara LED Catled", img: "/product/catled.png" },
  { name: "Barreras Fotoeléctricas", img: "/product/barrera.png" },
];

function FeaturedProducts() {
  return (
    <Box id="featured" sx={{ py: 8, px: 2, bgcolor: "#f5f5f5" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Productos destacados
      </Typography>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          600: { slidesPerView: 2 },
          960: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop
        autoplay={{ delay: 2000 }}
      >
        {products.map((p, i) => (
          <SwiperSlide key={i}>
            <Card sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={p.img}
                alt={p.name}
              />
              <CardContent>
                <Typography align="center">{p.name}</Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default FeaturedProducts;

