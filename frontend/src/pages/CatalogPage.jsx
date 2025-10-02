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

// 📐 Medidas centrales
const DIM = {
  mediaH: 120,                      // Alto del área de imagen
  cardRadius: 12,                   // Radio de borde de las cards
  btnH: 44,                         // Alto del botón
  cardMinH: { xs: 320, md: 360 },   // Alto mínimo de la card (responsive)
  nameH: 24,                        // Alto reservado para el nombre (1 línea)
  priceH: 38,                       // Alto visual de la zona de precio
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
  code: "#ec008c",      // magenta
  stock: "#ffd400",     // amarillo
  brand: "#00b5e2",     // cian
  category: "#6a1b9a",  // violeta
  addBtn: "#ff7f00",    // naranja Benetton
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
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="xl">
        {/* 🔥 Destacados (SIN fondo) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            backgroundColor: "transparent",
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

        <ProductCarousel products={products.slice(0, 10)} />

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

        {/* 📦 Tarjetas Catálogo (medidas unificadas) */}
        <Grid container spacing={3} sx={{ pl: 0 }}>
          {filteredProducts.map((p, idx) => {
            const img = resolveImage(p.photo);
            const outOfStock = !p.stock || p.stock <= 0;
            const pal = GREEN_PAL;

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
                    boxShadow: 3,
                    background: pal.bg,
                    color: pal.text,
                    border: `1px solid ${pal.border}`,
                    backdropFilter: "saturate(120%) blur(2px)",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 6,
                      background: pal.hover,
                      borderColor: pal.border,
                    },
                    transition: "all 0.25s ease",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={img}
                    alt={p.name}
                    sx={{
                      height: DIM.mediaH,              // alto fijo del área de imagen
                      objectFit: "contain",
                      bgcolor: pal.mediaBg,
                      borderTopLeftRadius: DIM.cardRadius,
                      borderTopRightRadius: DIM.cardRadius,
                    }}
                  />

                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    {/* Código */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                      <LabelIcon sx={{ fontSize: 18, color: COLORS.code }} />
                      <Typography variant="body2" fontWeight={700} sx={{ color: pal.text }}>
                        {p.code || "SIN CÓDIGO"}
                      </Typography>
                    </Box>

                    {/* Stock */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                      <InventoryIcon sx={{ fontSize: 18, color: COLORS.stock }} />
                      <Typography variant="body2" fontWeight={700} sx={{ color: pal.text }}>
                        {outOfStock ? "Sin stock" : `${p.stock} disponibles`}
                      </Typography>
                    </Box>

                    {/* Marca */}
                    {p.brand && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                        <FactoryIcon sx={{ fontSize: 18, color: COLORS.brand }} />
                        <Typography variant="body2" sx={{ color: pal.text }}>
                          {p.brand}
                        </Typography>
                      </Box>
                    )}

                    {/* Rubro */}
                    {(p.category || p.rubro) && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                        <CategoryIcon sx={{ fontSize: 18, color: COLORS.category }} />
                        <Typography variant="body2" sx={{ color: pal.text }}>
                          {p.category || p.rubro}
                        </Typography>
                      </Box>
                    )}

                    {/* Nombre: 1 renglón, centrado */}
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mt: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: pal.text,
                        textAlign: "center",
                        lineHeight: "24px",
                        height: DIM.nameH,
                      }}
                      title={p.name}
                    >
                      {p.name}
                    </Typography>

                    {/* Precio: negro, sin negrita, centrado */}
                    <Box sx={{ mt: 1, mb: 0.5, textAlign: "center", minHeight: DIM.priceH }}>
                      <Typography
                        component="div"
                        sx={{
                          fontWeight: 400, // sin negrita
                          fontSize: { xs: "1.85rem", sm: "2rem", md: "2.15rem" },
                          lineHeight: 1.08,
                          color: "#000",   // negro
                        }}
                      >
                        ${p.priceUSD}
                      </Typography>
                    </Box>

                    {/* Empuja el botón al fondo si el contenido es corto */}
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
                        borderRadius: 999,           // píldora
                        textTransform: "none",
                        backgroundColor: outOfStock ? "#000000" : COLORS.addBtn,
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: outOfStock ? "#000000" : COLORS.addBtnHover,
                        },
                        "&.Mui-disabled": {
                          backgroundColor: "#000000",
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






























