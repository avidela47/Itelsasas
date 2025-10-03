import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Fab,
  CircularProgress,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import BusinessIcon from "@mui/icons-material/Business";
import AddIcon from "@mui/icons-material/Add";
import { useProveedorStore } from "../../store/useProveedorStore";

function AdminProveedores() {
  const {
    proveedores,
    fetchProveedores,
    createProveedor,
    updateProveedor,
    deleteProveedor,
    loading,
  } = useProveedorStore();

  const [open, setOpen] = useState(false);
  const [editingProveedor, setEditingProveedor] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    logo: "",
    cuit: "",
    domicilio: "",
    email: "",
  });

  useEffect(() => {
    fetchProveedores();
  }, [fetchProveedores]);

  const handleOpen = (prov = null) => {
    setEditingProveedor(prov);
    setForm(prov || { nombre: "", logo: "", cuit: "", domicilio: "", email: "" });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (editingProveedor) {
      await updateProveedor(editingProveedor._id, form);
    } else {
      await createProveedor(form);
    }
    handleClose();
  };

  const colores = ["#F8BBD0", "#DCEDC8", "#B3E5FC", "#FFF9C4"];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Proveedores
      </Typography>

      {/* Botón Nuevo arriba */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => handleOpen()}
      >
        Nuevo Proveedor
      </Button>

      {/* Tarjeta resumen */}
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: "#fce4ec",
          mb: 3,
          maxWidth: 300,
          transition: "all 0.3s ease",
          "&:hover": { transform: "scale(1.03)", boxShadow: 5 },
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <BusinessIcon sx={{ fontSize: 32, color: "#c2185b" }} />
          <Box>
            <Typography variant="subtitle1">Total Proveedores</Typography>
            <Typography variant="h5">{proveedores.length}</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Loading */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {proveedores.map((prov, i) => (
            <Grid item xs={12} sm={6} md={4} key={prov._id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  bgcolor: colores[i % colores.length],
                  minHeight: 160,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                  <CardMedia
                    component="img"
                    image={prov.logo || "https://via.placeholder.com/60"}
                    alt={prov.nombre}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      objectFit: "cover",
                      mr: 2,
                    }}
                  />
                  <CardContent sx={{ p: 0 }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <StoreIcon sx={{ fontSize: 18, color: "#2e7d32" }} />
                      {prov.nombre}
                    </Typography>
                    <Typography variant="body2">🔢 {prov.cuit}</Typography>
                    <Typography variant="body2">📍 {prov.domicilio}</Typography>
                    <Typography variant="body2">📧 {prov.email}</Typography>
                  </CardContent>
                </Box>
                <CardActions sx={{ pt: 0, pl: 2 }}>
                  <Button
                    size="small"
                    sx={{
                      bgcolor: "#1976d2",
                      color: "#fff",
                      "&:hover": { bgcolor: "#115293" },
                    }}
                    onClick={() => handleOpen(prov)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      bgcolor: "#d32f2f",
                      color: "#fff",
                      "&:hover": { bgcolor: "#9a0007" },
                    }}
                    onClick={() => deleteProveedor(prov._id)}
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Botón flotante */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        onClick={() => handleOpen()}
      >
        <AddIcon />
      </Fab>

      {/* Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            minWidth: 400,
            position: "absolute",
            right: 50,
          },
        }}
        BackdropProps={{
          sx: { backgroundColor: "rgba(0,0,0,0.3)" }, // Fondo suave
        }}
      >
        <DialogTitle>{editingProveedor ? "Editar Proveedor" : "Nuevo Proveedor"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
          <TextField label="Logo (URL)" name="logo" value={form.logo} onChange={handleChange} />
          <TextField label="CUIT" name="cuit" value={form.cuit} onChange={handleChange} />
          <TextField label="Domicilio" name="domicilio" value={form.domicilio} onChange={handleChange} />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminProveedores;










