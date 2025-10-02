// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // azul MUI
    },
    secondary: {
      main: "#ff9800", // naranja
    },
    itelsa: {
      main: "#009640",       // 💚 Verde corporativo Itelsa
      contrastText: "#fff",  // Texto blanco sobre fondo verde
    },
    background: {
      default: "transparent",  // body
      paper: "transparent",    // AppBar, Paper, etc
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent", // siempre transparente
          boxShadow: "none",              // sin sombra
          backgroundImage: "none",        // quita degradados
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;





