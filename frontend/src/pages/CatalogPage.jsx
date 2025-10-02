// src/pages/CatalogPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  CircularProgress,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  CardActions,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { useCartStore } from "../store/useCartStore";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LabelIcon from "@mui/icons-material/Label";
import InventoryIcon from "@mui/icons-material/Inventory";
import FactoryIcon from "@mui/icons-material/Factory";
import CategoryIcon from "@mui/icons-material/Category";

import background from "../assets/Imagen de WhatsApp 2025-09-30 a las 09.25.32_2d304c7f.jpg";
import ProductCarousel from "../components/ProductCarousel";

// 📌 Resolver imagen
const resolveImage = (photo) => {
  if (!photo) return "/placeholder.png";
  const cleanName = photo.split("\\").pop().split("/").pop();
  if (cleanName.startsWith("http")) return cleanName;
  return `/product/${cleanName}`;
};

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const { addToCart, loading: cartLoading } = useCartStore();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get("/products");
        setProducts(Array.isArray(data) ? data : data?.products || []);
      } catch {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const uniqueBrands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  const uniqueCategories = [
    ...new Set(products.map((p) => p.category || p.rubro).filter(Boolean)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        (p.code || "").toLowerCase().includes(search.toLowerCase());

      const matchesBrand = brandFilter ? p.brand === brandFilter : true;
      const matchesCategory = categoryFilter
        ? (p.category || p.rubro) === categoryFilter
        : true;

      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [products, search, brandFilter, categoryFilter]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  return (
    <>
      <Box sx={{ position: "relative", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="xl">
          {/* 🔥 Destacados */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <LocalFireDepartmentIcon sx={{ fontSize: 36, color: "#e53935" }} />
            <Typography
              variant="h4"
              fontWeight={500}
              sx={{ mt: 0, letterSpacing: "0.5px", color: "white" }}
            >
              Destacados
            </Typography>
          </Box>
          <ProductCarousel products={products.slice(0, 10)} />

          {/* 📌 Título con icono */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
              mt: 4,
            }}
          >
            <StorefrontIcon sx={{ fontSize: 36, color: "#2ecc71" }} />
            <Typography
              variant="h4"
              fontWeight={500}
              sx={{ mt: 0, letterSpacing: "0.5px", color: "white" }}
            >
              Catálogo
            </Typography>
          </Box>

          {/* 🔍 Barra de búsqueda y filtros */}
          <Paper
            sx={{
              p: 2,
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label="Buscar producto"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
            </Box>

            <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel sx={{ color: "#fff" }}>Marca</InputLabel>
                <Select
                  value={brandFilter}
                  label="Marca"
                  onChange={(e) => setBrandFilter(e.target.value)}
                  sx={{ color: "#fff" }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: "#2b2b2b", // Fondo oscuro
                        color: "#fff",     // Texto blanco
                      },
                    },
                  }}
                >
                  <MenuItem value="" sx={{ color: "#fff" }}>
                    Todas
                  </MenuItem>
                  {uniqueBrands.map((brand) => (
                    <MenuItem key={brand} value={brand} sx={{ color: "#fff" }}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <InputLabel sx={{ color: "#fff" }}>Rubro</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Rubro"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  sx={{ color: "#fff" }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: "#2b2b2b", // Fondo oscuro
                        color: "#fff",     // Texto blanco
                      },
                    },
                  }}
                >
                  <MenuItem value="" sx={{ color: "#fff" }}>
                    Todos
                  </MenuItem>
                  {uniqueCategories.map((cat) => (
                    <MenuItem key={cat} value={cat} sx={{ color: "#fff" }}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>

          {!loading && !error && filteredProducts.length === 0 && (
            <Alert severity="info">No hay productos para mostrar.</Alert>
          )}

          {/* 📦 Tarjetas catálogo */}
          <Grid container spacing={3} sx={{ pl: 0 }}>
            {filteredProducts.map((p) => {
              const img = resolveImage(p.photo);
              const outOfStock = !p.stock || p.stock <= 0;

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  key={p._id}
                  sx={{
                    flexBasis: { xs: "100%", sm: "50%", md: "33.33%", lg: "20%" },
                    maxWidth: { xs: "100%", sm: "50%", md: "33.33%", lg: "20%" },
                  }}
                >
                  <Card
                    component={Link}
                    to={`/product/${p._id}`}
                    sx={{
                      textDecoration: "none",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      boxShadow: 3,
                      bgcolor: "#2e2e2e",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6,
                        bgcolor: "#3a3a3a",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={img}
                      alt={p.name}
                      sx={{ objectFit: "contain", bgcolor: "#444" }}
                    />
                    <CardContent sx={{ flexGrow: 1, textAlign: "left" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                        <LabelIcon sx={{ fontSize: 18, color: "#ff5252" }} />
                        <Typography variant="body2" fontWeight={700} sx={{ color: "#fff" }}>
                          {p.code || "SIN CÓDIGO"}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                        <InventoryIcon sx={{ fontSize: 18, color: "#fbc02d" }} />
                        <Typography variant="body2" fontWeight={600} sx={{ color: "#fff" }}>
                          {outOfStock ? "Sin stock" : `${p.stock} disponibles`}
                        </Typography>
                      </Box>

                      {p.brand && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                          <FactoryIcon sx={{ fontSize: 18, color: "#bbb" }} />
                          <Typography variant="body2" sx={{ color: "#fff" }}>
                            {p.brand}
                          </Typography>
                        </Box>
                      )}

                      {(p.category || p.rubro) && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                          <CategoryIcon sx={{ fontSize: 18, color: "#bbb" }} />
                          <Typography variant="body2" sx={{ color: "#fff" }}>
                            {p.category || p.rubro}
                          </Typography>
                        </Box>
                      )}

                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          minHeight: "40px",
                          mt: 1,
                          color: "#fff",
                        }}
                      >
                        {p.name}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ mt: 1, color: "#2ecc71" }}
                      >
                        ${p.priceUSD}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        disabled={outOfStock || cartLoading}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(p._id, 1);
                        }}
                        sx={{
                          backgroundColor: "#2ecc71",
                          "&:hover": { backgroundColor: "#27ae60" },
                        }}
                      >
                        {outOfStock ? "Sin stock" : "Agregar"}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default CatalogPage;












