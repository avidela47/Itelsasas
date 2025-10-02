import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import logo from "../assets/icon.png";
import background from "../assets/Imagen de WhatsApp 2025-09-30 a las 09.25.32_2d304c7f.jpg";

const RegisterPage = () => {
  const { register } = useAuthStore();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const ok = await register(form);
    if (ok) {
      window.location.href = "/";
    } else {
      setError("No se pudo crear la cuenta");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "calc(100vh - 64px)", // ocupa toda la pantalla menos el navbar
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 2, md: 0 },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: 360 },
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 6,
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: { xs: 2, md: 3 },
          textAlign: "center",
          color: "white",
          backgroundColor: 'rgba(0,0,0,0.45)',
          backgroundBlendMode: 'overlay',
        }}
      >
        <Avatar
          src={logo}
          alt="Logo"
          sx={{ width: 60, height: 60, mx: "auto", mb: 1, bgcolor: "white" }}
        />

        <Typography variant="h6" fontWeight={600} gutterBottom>
          Crear Cuenta
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Usuario"
            name="username"
            value={form.username}
            onChange={handleChange}
            margin="dense"
            size="small"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
            inputProps={{ 'aria-label': 'Usuario' }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="dense"
            size="small"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="dense"
            size="small"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
            inputProps={{ 'aria-label': 'Contraseña' }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 2,
              py: 1,
              fontWeight: "bold",
              backgroundColor: "rgba(46, 204, 113, 0.8)",
              "&:hover": { backgroundColor: "rgba(39, 174, 96, 0.9)" },
            }}
          >
            Registrarse
          </Button>
        </form>

        <Typography variant="body2" mt={2} sx={{ color: "#fff" }}>
          ¿Ya tenés cuenta?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "rgba(46, 204, 113, 0.9)" }}
          >
            Iniciar Sesión
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;




