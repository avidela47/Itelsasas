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
} from "@mui/material";
import { useProductStore } from "../../store/useProductStore";
import { useUserStore } from "../../store/useUserStore";
import { useOrderStore } from "../../store/useOrderStore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StorefrontIcon from "@mui/icons-material/Storefront"; 

// 📌 Resolver imagen
const resolveImage = (photo) => {
  if (!photo) return "/placeholder.png";
  const cleanName = photo.split("\\").pop().split("/").pop();
  if (cleanName.startsWith("http")) return cleanName;
  return `/product/${cleanName}`;
};

function AdminCatalog() {
  const { products, fetchProducts, loading, error } = useProductStore();
  const { users, fetchUsers } = useUserStore();
  const { orders, fetchOrders } = useOrderStore();

  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, [fetchProducts, fetchUsers, fetchOrders]);

  // 📊 Calcular métricas
  const stats = useMemo(() => {
    const ventas = orders.reduce((acc, o) => acc + (o.total || 0), 0);
    const ingresos = products.reduce(
      (acc, p) => acc + (p.priceUSD * (p.stock || 0)),
      0
    );

    return [
      {
        title: "Nuevos Usuarios",
        value: users.length,
        subtitle: "+15% este mes",
        icon: <PeopleIcon fontSize="large" sx={{ color: "#fff" }} />,
        bgcolor: "#1976d2",
      },
      {
        title: "Ventas",
        value: `$${ventas.toFixed(2)}`,
        subtitle: "+7% que antes",
        icon: <MonetizationOnIcon fontSize="large" sx={{ color: "#fff" }} />,
        bgcolor: "#0288d1",
      },
      {
        title: "Pedidos",
        value: orders.length,
        subtitle: "-15% que antes",
        icon: <ShoppingCartIcon fontSize="large" sx={{ color: "#fff" }} />,
        bgcolor: "#8e24aa",
      },
      {
        title: "Ingresos",
        value: `$${ingresos.toFixed(2)}`,
        subtitle: "+8% este mes",
        icon: <MonetizationOnIcon fontSize="large" sx={{ color: "#fff" }} />,
        bgcolor: "#2e7d32",
      },
    ];
  }, [users, orders, products]);

  // 📋 Opciones únicas de marcas y categorías
  const uniqueBrands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  const uniqueCategories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  // 🔍 Filtrado de productos
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.code || "").toLowerCase().includes(search.toLowerCase());

    const matchesBrand = brandFilter ? p.brand === brandFilter : true;
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;

    return matchesSearch && matchesBrand && matchesCategory;
  });

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
    <Container maxWidth="xl" sx={{ py: 2, overflowX: "hidden" }}>
      {/* 📌 Título ajustado con icono */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <StorefrontIcon sx={{ fontSize: 36, color: "#1976d2" }} />
        <Typography
          variant="h4"
          fontWeight={500}
          sx={{ mt: 0, letterSpacing: "0.5px" }}
        >
          Almacén
        </Typography>
      </Box>

      {/* 📊 Bloque de estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 2,
                bgcolor: card.bgcolor,
                color: "#fff",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px) scale(1.03)",
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.25)",
                },
              }}
            >
              <Box>
                <Typography variant="subtitle2">{card.title}</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {card.value}
                </Typography>
                <Typography variant="body2">{card.subtitle}</Typography>
              </Box>
              {card.icon}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* 🔍 Buscador y filtros */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "#f9f9f9",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="Buscar producto"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Marca</InputLabel>
            <Select
              value={brandFilter}
              label="Marca"
              onChange={(e) => setBrandFilter(e.target.value)}
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
            <InputLabel>Rubro</InputLabel>
            <Select
              value={categoryFilter}
              label="Rubro"
              onChange={(e) => setCategoryFilter(e.target.value)}
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

      {/* 📦 Cards de productos */}
      <Grid container spacing={2}>
        {filteredProducts.map((p) => {
          const img = resolveImage(p.photo);

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={p._id}>
              <Card
                sx={{
                  height: "100%",
                  maxWidth: 220,     // 👈 limita ancho
                  margin: "0 auto",  // 👈 centra la card
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: 2,
                  bgcolor: "#fafafa",
                  "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                  transition: "all 0.3s ease",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={img}
                  alt={p.name}
                  sx={{ objectFit: "contain", bgcolor: "#f1f1f1" }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 1 }}>
                  <Box
                    sx={{
                      bgcolor: "#bbdefb",
                      px: 1,
                      py: 0.3,
                      borderRadius: 1,
                      display: "inline-block",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    {p.code || "SIN CÓDIGO"}
                  </Box>

                  <Typography variant="subtitle2" fontWeight={600}>
                    {p.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.description}
                  </Typography>

                  <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 0.5 }}>
                    ${p.priceUSD}
                  </Typography>

                  <Box
                    sx={{
                      mt: 0.5,
                      display: "flex",
                      justifyContent: "center",
                      gap: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "#e3f2fd",
                        px: 0.8,
                        py: 0.3,
                        borderRadius: 1,
                        fontSize: "0.7rem",
                      }}
                    >
                      Marca: {p.brand || "N/A"}
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "#fce4ec",
                        px: 0.8,
                        py: 0.3,
                        borderRadius: 1,
                        fontSize: "0.7rem",
                      }}
                    >
                      Stock: {p.stock}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default AdminCatalog;













