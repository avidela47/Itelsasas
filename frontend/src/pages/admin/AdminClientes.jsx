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
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import { useClienteStore } from "../../store/useClienteStore";

function AdminClientes() {
  const { clientes, fetchClientes, createCliente, updateCliente, deleteCliente, loading } =
    useClienteStore();

  const [open, setOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    logo: "",
    cuit: "",
    domicilio: "",
    email: "",
  });

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  const handleOpen = (cliente = null) => {
    setEditingCliente(cliente);
    setForm(cliente || { nombre: "", logo: "", cuit: "", domicilio: "", email: "" });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (editingCliente) {
      await updateCliente(editingCliente._id, form);
    } else {
      await createCliente(form);
    }
    handleClose();
  };

  const colores = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFE0B2"];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Clientes
      </Typography>

      {/* Botón Nuevo arriba */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => handleOpen()}
      >
        Nuevo Cliente
      </Button>

      {/* Tarjeta resumen */}
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: "#e3f2fd",
          mb: 3,
          maxWidth: 300,
          transition: "all 0.3s ease",
          "&:hover": { transform: "scale(1.03)", boxShadow: 5 },
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PeopleIcon sx={{ fontSize: 32, color: "#1976d2" }} />
          <Box>
            <Typography variant="subtitle1">Total Clientes</Typography>
            <Typography variant="h5">{clientes.length}</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Loading */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {clientes.map((cliente, i) => (
            <Grid item xs={12} sm={6} md={4} key={cliente._id}>
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
                    image={cliente.logo || "https://via.placeholder.com/60"}
                    alt={cliente.nombre}
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
                      <BusinessIcon sx={{ fontSize: 18, color: "#1565c0" }} />
                      {cliente.nombre}
                    </Typography>
                    <Typography variant="body2">🔢 {cliente.cuit}</Typography>
                    <Typography variant="body2">📍 {cliente.domicilio}</Typography>
                    <Typography variant="body2">📧 {cliente.email}</Typography>
                  </CardContent>
                </Box>
                <CardActions sx={{ pt: 0, pl: 2 }}>
                  <Button
                    size="small"
                    sx={{ bgcolor: "#1976d2", color: "#fff", "&:hover": { bgcolor: "#115293" } }}
                    onClick={() => handleOpen(cliente)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    sx={{ bgcolor: "#d32f2f", color: "#fff", "&:hover": { bgcolor: "#9a0007" } }}
                    onClick={() => deleteCliente(cliente._id)}
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
        <DialogTitle>{editingCliente ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
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

export default AdminClientes;









