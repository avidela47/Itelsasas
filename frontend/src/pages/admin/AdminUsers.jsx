import React, { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  CircularProgress,
  Box,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

function AdminUsers() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const { users, fetchUsers, loading, error } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

  const rolesCount = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* 🔹 Título con ícono */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <PeopleIcon sx={{ fontSize: 36, color: "#1976d2" }} />
        <Typography
          variant="h4"
          fontWeight={500}
          sx={{ letterSpacing: "0.5px" }}
        >
          Gestión de Usuarios
        </Typography>
      </Box>

      {/* 🔹 Cards resumen */}
      <Grid container spacing={2} sx={{ mb: 3 }} justifyContent="center">
        {/* Usuarios */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              bgcolor: "#e1f5fe",
              borderRadius: 3,
              boxShadow: 2,
              minHeight: 140,
              display: "flex",
              alignItems: "center",
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
              transition: "all 0.3s ease",
            }}
          >
            <CardContent sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PeopleIcon sx={{ fontSize: 32, color: "#0288d1" }} />
                <Box>
                  <Typography variant="h6">Usuarios</Typography>
                  <Typography variant="h4">{users.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Roles */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              bgcolor: "#fce4ec",
              borderRadius: 3,
              boxShadow: 2,
              minHeight: 140,
              display: "flex",
              alignItems: "center",
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
              transition: "all 0.3s ease",
            }}
          >
            <CardContent sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AssignmentIndIcon sx={{ fontSize: 32, color: "#c2185b" }} />
                <Box sx={{ width: "100%" }}>
                  <Typography variant="h6">Roles</Typography>
                  <Grid container spacing={1}>
                    {Object.entries(rolesCount).map(([rol, count]) => (
                      <Grid item xs={12} key={rol}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body2">{rol}</Typography>
                          <Typography variant="h6" fontWeight={600}>
                            {count}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabla en escritorio, lista de cards en móvil */}
      <Box>
        {isSmUp ? (
          <Box sx={{ overflowX: "auto" }}>
            <TableContainer component={Paper} sx={{ minWidth: 650 }}>
              <Table sx={{ minWidth: 900 }}>
                <TableHead sx={{ bgcolor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>Usuario</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Rol</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u._id}>
                      <TableCell>{u.username}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {users.map((u) => (
              <Grid item xs={12} key={u._id}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="h6">{u.username}</Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {u.email}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">{u.role}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
}

export default AdminUsers;
















