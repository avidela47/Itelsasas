import React, { useEffect, useState } from "react";
import { useProductStore } from "../../store/useProductStore";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Box,
  IconButton,
  Card,
  CardContent,
  Grid,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Edit, Delete, Search } from "@mui/icons-material";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";

// 📌 Resolver imagen
const resolveImage = (photo) => {
  if (!photo) return "/placeholder.png";
  const cleanName = photo.split("\\").pop().split("/").pop();
  if (cleanName.startsWith("http")) return cleanName;
  return `/product/${cleanName}`;
};

function AdminProducts() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    loading,
    error,
  } = useProductStore();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    code: "",
    name: "",
    priceUSD: "",
    stock: "",
    description: "",
    brand: "",
    category: "",
    photo: "",
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, photo: file.name });
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      priceUSD: Number(form.priceUSD),
      stock: Number(form.stock),
    };

    if (editing) {
      await updateProduct(editing._id, payload);
    } else {
      await createProduct(payload);
    }

    setOpen(false);
    setEditing(null);
    setForm({
      code: "",
      name: "",
      priceUSD: "",
      stock: "",
      description: "",
      brand: "",
      category: "",
      photo: "",
    });
  };

  const handleEdit = (product) => {
    setEditing(product);
    setForm({
      code: product.code,
      name: product.name,
      priceUSD: product.priceUSD,
      stock: product.stock,
      description: product.description || "",
      brand: product.brand || "",
      category: product.category || "",
      photo: product.photo || "",
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      await deleteProduct(id);
    }
  };

  const filteredProducts = products.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.code?.toLowerCase().includes(term) ||
      p.name?.toLowerCase().includes(term) ||
      p.brand?.toLowerCase().includes(term) ||
      p.category?.toLowerCase().includes(term)
    );
  });

  const cantidadProductos = products.length;
  const cantidadMarcas = new Set(products.map((p) => p.brand).filter(Boolean)).size;
  const cantidadCategorias = new Set(products.map((p) => p.category).filter(Boolean)).size;

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    );

  return (
    <div>
      {/* 🔹 Título */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <InventoryIcon sx={{ fontSize: 36, color: "#1976d2" }} />
        <Typography variant="h4" fontWeight={500}>
          Gestión de Productos
        </Typography>
      </Box>

      {/* 🔹 Métricas */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#e3f2fd", borderRadius: 3, boxShadow: 2, height: 120, display: "flex", alignItems: "center", transition: "all 0.3s ease", "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
            <CardContent sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <InventoryIcon sx={{ fontSize: 32, color: "#1976d2" }} />
                <Box>
                  <Typography variant="h6">Productos</Typography>
                  <Typography variant="h4">{cantidadProductos}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#c8e6c9", borderRadius: 3, boxShadow: 2, height: 120, display: "flex", alignItems: "center", transition: "all 0.3s ease", "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
            <CardContent sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <StoreIcon sx={{ fontSize: 32, color: "#2e7d32" }} />
                <Box>
                  <Typography variant="h6">Marcas</Typography>
                  <Typography variant="h4">{cantidadMarcas}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: "#fce4ec", borderRadius: 3, boxShadow: 2, height: 120, display: "flex", alignItems: "center", transition: "all 0.3s ease", "&:hover": { transform: "scale(1.03)", boxShadow: 6 } }}>
            <CardContent sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CategoryIcon sx={{ fontSize: 32, color: "#c2185b" }} />
                <Box>
                  <Typography variant="h6">Categorías</Typography>
                  <Typography variant="h4">{cantidadCategorias}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 🔹 Botón + buscador (responsive: apilan en móvil) */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditing(null);
            setForm({
              code: "",
              name: "",
              priceUSD: "",
              stock: "",
              description: "",
              brand: "",
              category: "",
              photo: "",
            });
            setOpen(true);
          }}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          + Nuevo Producto
        </Button>

        <TextField
          variant="outlined"
          placeholder="Buscar por código, nombre, marca o categoría"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Tabla (envolvida para permitir scroll horizontal en pantallas pequeñas) */}
      <Box>
        {isMdUp ? (
          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Paper} sx={{ minWidth: 650 }}>
              <Table sx={{ minWidth: 900 }}>
                <TableHead sx={{ bgcolor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Código</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Nombre</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Descripción</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Marca</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Categoría</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Precio USD</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Stock</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Foto</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((p) => {
                    const img = resolveImage(p.photo);
                    return (
                      <TableRow key={p._id}>
                        <TableCell>{p.code}</TableCell>
                        <TableCell>{p.name}</TableCell>
                        <TableCell style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {p.description}
                        </TableCell>
                        <TableCell>{p.brand}</TableCell>
                        <TableCell>{p.category}</TableCell>
                        <TableCell>${p.priceUSD}</TableCell>
                        <TableCell>{p.stock}</TableCell>
                        <TableCell>
                          <img src={img} alt={p.name} loading="lazy" decoding="async" style={{ width: 70, height: 70, objectFit: "contain", borderRadius: 4, display: "block", margin: "auto" }} />
                        </TableCell>
                        <TableCell>
                          <IconButton color="primary" onClick={() => handleEdit(p)}>
                            <Edit />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDelete(p._id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredProducts.map((p) => (
              <Grid item xs={12} key={p._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                      <Box sx={{ width: { xs: '80%', sm: 90 }, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                        <img src={resolveImage(p.photo)} alt={p.name} loading="lazy" decoding="async" style={{ width: '100%', maxWidth: 140, height: 90, objectFit: 'contain' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">{p.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{p.code} — {p.brand || '—'}</Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1 }}>${p.priceUSD} • Stock: {p.stock}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 120 }}>
                        <Button variant="contained" size="small" onClick={() => handleEdit(p)} sx={{ width: { xs: '100%', sm: 'auto' } }}>Editar</Button>
                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(p._id)} sx={{ width: { xs: '100%', sm: 'auto' } }}>Eliminar</Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Modal estilo Cart - responsive */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        fullScreen={isMdDown}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(50,50,50,0.95)",
            color: "#fff",
            borderRadius: 3,
            p: 0,
            height: { md: 'auto' }
          },
        }}
      >
        <DialogTitle sx={{ color: "#fff" }}>
          {editing ? "Editar Producto" : "Nuevo Producto"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ mt: 0, px: { xs: 2, md: 3 }, pb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Código" name="code" margin="dense" value={form.code} onChange={handleChange}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  InputProps={{ style: { color: "#fff" } }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Nombre" name="name" margin="dense" value={form.name} onChange={handleChange}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  InputProps={{ style: { color: "#fff" } }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Precio USD" name="priceUSD" type="number" margin="dense" value={form.priceUSD} onChange={handleChange}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  InputProps={{ style: { color: "#fff" } }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Stock" name="stock" type="number" margin="dense" value={form.stock} onChange={handleChange}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  InputProps={{ style: { color: "#fff" } }} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  name="description"
                  margin="dense"
                  multiline
                  rows={3}
                  inputProps={{ maxLength: 200 }}
                  value={form.description}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  InputProps={{ style: { color: "#fff" } }}
                />
                <Typography variant="caption" sx={{ color: "#ccc", float: "right" }}>
                  {form.description.length}/200
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Marca" name="brand" margin="dense" value={form.brand} onChange={handleChange}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  InputProps={{ style: { color: "#fff" } }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Categoría" name="category" margin="dense" value={form.category} onChange={handleChange}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  InputProps={{ style: { color: "#fff" } }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Button variant="contained" component="label" sx={{ backgroundColor: "#2ecc71", "&:hover": { backgroundColor: "#27ae60" } }}>
                  Seleccionar Foto
                  <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                </Button>
              </Grid>

              <Grid item xs={12} md={6}>
                {form.photo && (
                  <Box sx={{ mt: { xs: 1, md: 0 }, display: 'flex', justifyContent: 'center' }}>
                    <img src={resolveImage(form.photo)} alt="preview" loading="lazy" decoding="async"
                      style={{ maxWidth: '100%', height: 140, objectFit: 'contain', borderRadius: 4, border: '1px solid #ccc' }} />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 }, flexDirection: { xs: 'column', md: 'row' }, gap: 1 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: "#fff" }} fullWidth={isMdDown}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#2ecc71", "&:hover": { backgroundColor: "#27ae60" } }} fullWidth={isMdDown}>
            {editing ? "Guardar Cambios" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminProducts;










