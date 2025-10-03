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

import ProductCarousel from "../components/ProductCarousel";

// 📐 Medidas centrales
const DIM = {
  mediaH: 120,
  cardRadius: 12,
  btnH: 44,
  cardMinH: { xs: 320, md: 360 },
  nameH: 24,
  priceH: 38,
};

// 📌 Resolver imagen
const resolveImage = (photo) => {
  if (!photo) return "/placeholder.png";
  const cleanName = photo.split("\\").pop().split("/").pop();
  if (cleanName.startsWith("http")) return cleanName;
  return `/product/${cleanName}`;
};

/* ==========================
   🎨 ÚNICA PALETA VERDE (GLASS)
   ========================== */
const GREEN_PAL = {
  bg: "linear-gradient(180deg, rgba(0,168,89,0.78) 0%, rgba(0,141,76,0.72) 100%)",
  hover: "linear-gradient(180deg, rgba(0,150,79,0.92) 0%, rgba(0,122,66,0.9) 100%)",
  text: "#ffffff",
  subtext: "rgba(255,255,255,0.9)",
  mediaBg: "rgba(233,247,239,0.65)",
  border: "rgba(255,255,255,0.18)",
};

// 🎯 Colores Benetton para íconos y botón
const COLORS = {
  code: "#ec008c",
  stock: "#ffd400",
  brand: "#00b5e2",
  category: "#6a1b9a",
  addBtn: "#ff7f00",
  addBtnHover: "#e97000",
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
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        py: 4,
        background: "transparent",
      }}
    >
      <Container maxWidth="xl">
        {/* 🔥 Destacados */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            backgroundColor: "transparent",
            position: "relative",
            zIndex: 2,
          }}
        >
          <LocalFireDepartmentIcon
            sx={{ fontSize: 36, color: "#e53935", backgroundColor: "transparent" }}
          />
          <Typography
            variant="h4"
            fontWeight={500}
            sx={{ color: "#fff", backgroundColor: "transparent" }}
          >
            Destacados
          </Typography>
        </Box>

        {/* Carrusel transparente */}
        <Box
          sx={{
            bgcolor: "transparent",
            position: "relative",
            zIndex: 1,
            "& .swiper, & .swiper-wrapper, & .swiper-slide": {
              background: "transparent !important",
              backgroundColor: "transparent !important",
            },
            "& .MuiPaper-root": {
              background: "transparent !important",
              backgroundColor: "transparent !important",
              boxShadow: "none",
            },
          }}
        >
          <ProductCarousel products={products.slice(0, 10)} />
        </Box>

        {/* 📌 Catálogo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 4 }}>
          <StorefrontIcon sx={{ fontSize: 36, color: "#2ecc71" }} />
          <Typography variant="h4" fontWeight={500} sx={{ color: "#fff" }}>
            Catálogo
          </Typography>
        </Box>

        {/* 🔍 Filtros */}
        <Paper
          sx={{
            p: 2,
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "rgba(20,20,20,0.7)",
            backdropFilter: "blur(6px)",
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
                MenuProps={{ PaperProps: { sx: { bgcolor: "#111", color: "#fff" } } }}
              >
                <MenuItem value="">Todas</MenuItem>
                {uniqueBrands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
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
                MenuProps={{ PaperProps: { sx: { bgcolor: "#111", color: "#fff" } } }}
              >
                <MenuItem value="">Todos</MenuItem>
                {uniqueCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
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

        {/* 📦 Tarjetas Catálogo */}
        <Grid container spacing={3} sx={{ pl: 0 }}>
          {filteredProducts.map((p, idx) => {
            const img = resolveImage(p.photo);
            const outOfStock = !p.stock || p.stock <= 0;

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2}
                key={p._id || idx}
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
                    minHeight: { xs: DIM.cardMinH.xs, md: DIM.cardMinH.md },
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: DIM.cardRadius,
                    position: "relative",
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.46) 100%)",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(6px) saturate(130%)",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
                      background:
                        "linear-gradient(90deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.52) 100%)",
                    },
                    transition: "all 0.25s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      borderRadius: DIM.cardRadius,
                      pointerEvents: "none",
                      background:
                        "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "4px 4px",
                      opacity: 0.35,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={img}
                    alt={p.name}
                    sx={{
                      height: DIM.mediaH,
                      objectFit: "contain",
                      bgcolor: "rgba(255,255,255,0.10)",
                      borderTopLeftRadius: DIM.cardRadius,
                      borderTopRightRadius: DIM.cardRadius,
                    }}
                  />

                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    {/* Código */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                      <LabelIcon sx={{ fontSize: 18, color: COLORS.code }} />
                      <Typography variant="body2" fontWeight={700} sx={{ color: "#fff" }}>
                        {p.code || "SIN CÓDIGO"}
                      </Typography>
                    </Box>

                    {/* Stock */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                      <InventoryIcon sx={{ fontSize: 18, color: COLORS.stock }} />
                      <Typography variant="body2" fontWeight={700} sx={{ color: "#fff" }}>
                        {outOfStock ? "Sin stock" : `${p.stock} disponibles`}
                      </Typography>
                    </Box>

                    {/* Marca */}
                    {p.brand && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                        <FactoryIcon sx={{ fontSize: 18, color: COLORS.brand }} />
                        <Typography variant="body2" sx={{ color: "#fff" }}>
                          {p.brand}
                        </Typography>
                      </Box>
                    )}

                    {/* Rubro */}
                    {(p.category || p.rubro) && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                        <CategoryIcon sx={{ fontSize: 18, color: COLORS.category }} />
                        <Typography variant="body2" sx={{ color: "#fff" }}>
                          {p.category || p.rubro}
                        </Typography>
                      </Box>
                    )}

                    {/* Nombre */}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mt: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "#fff",
                        textAlign: "center",
                        lineHeight: "24px",
                        height: DIM.nameH,
                      }}
                      title={p.name}
                    >
                      {p.name}
                    </Typography>

                    {/* Precio */}
                    <Box sx={{ mt: 1, mb: 0.5, textAlign: "center", minHeight: DIM.priceH }}>
                      <Typography
                        component="div"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1.85rem", sm: "2rem", md: "2.15rem" },
                          lineHeight: 1.08,
                          color: "#2ecc71",
                        }}
                      >
                        ${p.priceUSD}
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />
                  </CardContent>

                  <CardActions
                    sx={{
                      p: 2,
                      pt: 0,
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<AddShoppingCartIcon />}
                      disabled={outOfStock || cartLoading}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!outOfStock) addToCart(p._id, 1);
                      }}
                      sx={{
                        height: DIM.btnH,
                        borderRadius: 999,
                        textTransform: "none",
                        // 🔴 Rojo esmerilado si NO hay stock, negro glass si hay
                        background: outOfStock
                          ? "linear-gradient(90deg, rgba(200,0,0,0.80) 0%, rgba(160,0,0,0.70) 100%)"
                          : "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.50) 100%)",
                        border: outOfStock
                          ? "1px solid rgba(255,100,100,0.55)"
                          : "1px solid rgba(255,255,255,0.18)",
                        backdropFilter: "blur(6px) saturate(130%)",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
                        color: "#fff",
                        "&:hover": {
                          background: outOfStock
                            ? "linear-gradient(90deg, rgba(200,0,0,0.85) 0%, rgba(160,0,0,0.78) 100%)"
                            : "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.60) 100%)",
                          transform: outOfStock ? "none" : "translateY(-1px)",
                        },
                        "&.Mui-disabled": {
                          // Mantener rojo cuando está deshabilitado por 'Sin stock'
                          background: outOfStock
                            ? "linear-gradient(90deg, rgba(200,0,0,0.80) 0%, rgba(160,0,0,0.70) 100%)"
                            : "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.40) 100%)",
                          border: outOfStock
                            ? "1px solid rgba(255,100,100,0.55)"
                            : "1px solid rgba(255,255,255,0.18)",
                          color: "#fff",
                          opacity: 1,
                        },
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
  );
}

export default CatalogPage;




































