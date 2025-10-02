// src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  Box,
  Divider,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { api } from "../lib/api";
import { useCartStore } from "../store/useCartStore";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, loading: cartLoading } = useCartStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );

  if (!product) return null;

  const price =
    typeof product.price === "number"
      ? product.price
      : typeof product.priceUSD === "number"
      ? product.priceUSD
      : 0;

  const image =
    product.image ||
    product.photo ||
    "https://via.placeholder.com/800x600?text=Producto";

  const outOfStock = !product.stock || product.stock <= 0;

  const handleAdd = async () => {
    if (outOfStock) return;
    await addToCart(product._id, 1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 }, pb: isMobile ? 10 : 4 }}>
      <Grid container spacing={4} direction={isMobile ? "column" : "row"}>
        {/* Imagen */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={2}
            sx={{
              p: { xs: 1, md: 2 },
              textAlign: "center",
              width: "100%",
              height: { xs: 260, md: 500 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                style={{
                  maxWidth: "100%",
                  maxHeight: isMobile ? 240 : 480,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Info */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            pl: { xs: 0, md: 6 },
            pr: { xs: 0, md: 2 },
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{
                display: "inline-block",
                backgroundColor: "#ff9800",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                px: 2,
                py: 0.5,
                borderRadius: "8px",
              }}
            >
              {product.code || "SIN-CÓDIGO"}
            </Typography>
          </Box>

          {/* Nombre */}
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight={700}
            gutterBottom
            sx={{ color: "#fff" }}
          >
            {product.name}
          </Typography>

          <Stack direction="row" spacing={1} mb={2}>
            <Chip
              label={product.brand || "Sin marca"}
              sx={{
                backgroundColor: "#b71c1c",
                color: "#fff",
                fontWeight: 700,
              }}
            />
            <Chip
              label={product.category || product.rubro || "General"}
              sx={{
                backgroundColor: "#ff9800",
                color: "#fff",
                fontWeight: 700,
              }}
            />
          </Stack>

          {/* Precio */}
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={700}
            gutterBottom
            sx={{ color: "#fff" }}
          >
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
            })}
          </Typography>

          <Box sx={{ mb: 3 }}>
            {outOfStock ? (
              <Chip label="Sin stock" color="error" />
            ) : (
              <Chip label={`Stock: ${product.stock}`} color="success" />
            )}
          </Box>

          {/* Botón compacto y centrado */}
          <Button
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAdd}
            disabled={outOfStock || cartLoading}
            aria-label={outOfStock ? "Sin stock" : "Agregar al carrito"}
            sx={{
              mb: 4,
              px: 3,
              py: 0.8,
              alignSelf: "center", // 🔹 centrado en la columna
              fontWeight: 700,
              fontSize: "0.9rem",
              backgroundColor: outOfStock ? "#c0392b" : "#2ecc71",
              color: "#fff",
              "&:hover": {
                backgroundColor: outOfStock ? "#922b21" : "#27ae60",
              },
              "&.Mui-disabled": {
                backgroundColor: "#c0392b",
                color: "#fff",
                opacity: 1,
              },
            }}
          >
            {outOfStock ? "Sin stock" : "Agregar al carrito"}
          </Button>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
            Descripción
          </Typography>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              maxHeight: 150,
              overflowY: "auto",
              color: "#fff",
            }}
          >
            {product.description || "Sin descripción disponible."}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;























