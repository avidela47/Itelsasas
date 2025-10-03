import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";

import { useProductStore } from "../../store/useProductStore";
import { useClienteStore } from "../../store/useClienteStore"; // ✅ ahora clientes
import { useDocumentoStore } from "../../store/useDocumentoStore";

function AdminDocumentos() {
  const { products, fetchProducts } = useProductStore();
  const { clientes, fetchClientes } = useClienteStore(); // ✅ clientes reales
  const {
    documentos,
    fetchDocumentos,
    createDocumento,
    aprobarDocumento,
    deleteDocumento,
  } = useDocumentoStore();

  const [documento, setDocumento] = useState({
    nro: "0001-00000001",
    fecha: new Date().toISOString().split("T")[0],
    cliente: "",
    cuit: "",
    domicilio: "",
    localidad: "",
    articulos: [],
  });

  useEffect(() => {
    fetchProducts();
    fetchClientes(); // ✅ en lugar de fetchUsers
    fetchDocumentos();
  }, [fetchProducts, fetchClientes, fetchDocumentos]);

  // ✅ agregar fila vacía
  const agregarFila = () => {
    setDocumento((prev) => ({
      ...prev,
      articulos: [
        ...prev.articulos,
        { producto: "", cantidad: 0, descripcion: "", precio: 0 },
      ],
    }));
  };

  // ✅ actualizar campo
  const handleChange = (index, field, value) => {
    const nuevosArticulos = [...documento.articulos];
    nuevosArticulos[index][field] = value;
    setDocumento((prev) => ({ ...prev, articulos: nuevosArticulos }));
  };

  // ✅ calcular total
  const calcularTotal = () => {
    return documento.articulos.reduce(
      (acc, item) => acc + (item.cantidad * item.precio || 0),
      0
    );
  };

  // ✅ aprobar documento → guarda en DB y descuenta stock
  const handleApprove = async () => {
    try {
      const nuevoDoc = await createDocumento(documento);
      await aprobarDocumento(nuevoDoc._id);
      alert("✅ Documento aprobado y stock actualizado");
      setDocumento({
        nro: "0001-00000001",
        fecha: new Date().toISOString().split("T")[0],
        cliente: "",
        cuit: "",
        domicilio: "",
        localidad: "",
        articulos: [],
      });
      fetchDocumentos();
    } catch (err) {
      alert("❌ Error al aprobar documento: " + err.message);
    }
  };

  // ✅ imprimir documento
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Documentos
      </Typography>

      {/* Tarjetas informativas */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        {/* Total Documentos */}
        <Grid item xs={12} sm={4} md={3}>
          <Card
            sx={{
              bgcolor: "#e3f2fd",
              borderRadius: 3,
              boxShadow: 2,
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <DescriptionIcon sx={{ fontSize: 32, color: "#1976d2" }} />
                <Box>
                  <Typography variant="h6">Documentos</Typography>
                  <Typography variant="h4">{documentos.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Productos */}
        <Grid item xs={12} sm={4} md={3}>
          <Card
            sx={{
              bgcolor: "#fff3e0",
              borderRadius: 3,
              boxShadow: 2,
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <InventoryIcon sx={{ fontSize: 32, color: "#f57c00" }} />
                <Box>
                  <Typography variant="h6">Productos</Typography>
                  <Typography variant="h4">{products.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Clientes */}
        <Grid item xs={12} sm={4} md={3}>
          <Card
            sx={{
              bgcolor: "#fce4ec",
              borderRadius: 3,
              boxShadow: 2,
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PeopleIcon sx={{ fontSize: 32, color: "#c2185b" }} />
                <Box>
                  <Typography variant="h6">Clientes</Typography>
                  <Typography variant="h4">{clientes.length}</Typography> {/* ✅ ahora sí clientes */}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Remito / Documento */}
      <Paper sx={{ p: 3, mb: 3 }}>
        {/* Datos generales */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Typography variant="h6">Cliente</Typography>
            <TextField
              size="small"
              label="Nombre"
              value={documento.cliente}
              onChange={(e) =>
                setDocumento({ ...documento, cliente: e.target.value })
              }
              sx={{ mr: 2 }}
            />
            <TextField
              size="small"
              label="CUIT"
              value={documento.cuit}
              onChange={(e) =>
                setDocumento({ ...documento, cuit: e.target.value })
              }
            />
          </Box>
          <Box>
            <Typography variant="h6">Datos del Documento</Typography>
            <TextField
              size="small"
              label="Número"
              value={documento.nro}
              onChange={(e) =>
                setDocumento({ ...documento, nro: e.target.value })
              }
              sx={{ mr: 2 }}
            />
            <TextField
              size="small"
              type="date"
              value={documento.fecha}
              onChange={(e) =>
                setDocumento({ ...documento, fecha: e.target.value })
              }
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Domicilio"
            value={documento.domicilio}
            onChange={(e) =>
              setDocumento({ ...documento, domicilio: e.target.value })
            }
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            size="small"
            label="Localidad"
            value={documento.localidad}
            onChange={(e) =>
              setDocumento({ ...documento, localidad: e.target.value })
            }
          />
        </Box>

        {/* Tabla de artículos */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Artículo</TableCell>
              <TableCell>Cant.</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>P. Unit.</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documento.articulos.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Select
                    size="small"
                    value={item.producto}
                    onChange={(e) =>
                      handleChange(index, "producto", e.target.value)
                    }
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="">-- Seleccionar --</MenuItem>
                    {products.map((p) => (
                      <MenuItem key={p._id} value={p._id}>
                        {p.codigo || p.name}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={item.cantidad}
                    onChange={(e) =>
                      handleChange(index, "cantidad", parseInt(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    value={item.descripcion}
                    onChange={(e) =>
                      handleChange(index, "descripcion", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={item.precio}
                    onChange={(e) =>
                      handleChange(index, "precio", parseFloat(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>
                  ${(item.cantidad * item.precio).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Botones */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={agregarFila}
          >
            Agregar Artículo
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={handleApprove}
          >
            Aprobar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            Imprimir
          </Button>
        </Box>

        {/* Total */}
        <Box sx={{ textAlign: "right", mt: 2, fontWeight: "bold" }}>
          TOTAL: ${calcularTotal().toFixed(2)}
        </Box>
      </Paper>

      {/* Listado de documentos */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Listado de Documentos
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos.map((doc) => (
              <TableRow key={doc._id}>
                <TableCell>{doc.nro}</TableCell>
                <TableCell>
                  {new Date(doc.fecha).toLocaleDateString()}
                </TableCell>
                <TableCell>{doc.cliente}</TableCell>
                <TableCell>{doc.estado}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ mr: 1, bgcolor: "#1976d2", "&:hover": { bgcolor: "#115293" } }}
                    onClick={() => alert("Editar en construcción")}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ bgcolor: "#d32f2f", "&:hover": { bgcolor: "#9a0007" } }}
                    onClick={() => deleteDocumento(doc._id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default AdminDocumentos;

