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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";

import { useProductStore } from "../../store/useProductStore";
import { useClienteStore } from "../../store/useClienteStore";
import { useDocumentoStore } from "../../store/useDocumentoStore";

function AdminDocumentos() {
  const { products, fetchProducts } = useProductStore();
  const { clientes, fetchClientes } = useClienteStore();
  const {
    documentos,
    fetchDocumentos,
    createDocumento,
    updateDocumento,
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

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchClientes();
    fetchDocumentos();
  }, [fetchProducts, fetchClientes, fetchDocumentos]);

  const agregarFila = () => {
    setDocumento((prev) => ({
      ...prev,
      articulos: [
        ...prev.articulos,
        { producto: "", cantidad: 0, descripcion: "", precio: 0 },
      ],
    }));
  };

  const handleChange = (index, field, value) => {
    const nuevosArticulos = [...documento.articulos];
    nuevosArticulos[index][field] = value;
    setDocumento((prev) => ({ ...prev, articulos: nuevosArticulos }));
  };

  const calcularTotal = () => {
    return documento.articulos.reduce(
      (acc, item) => acc + (item.cantidad * item.precio || 0),
      0
    );
  };

  const handleApprove = async () => {
    try {
      if (documento._id) {
        await updateDocumento(documento._id, documento);
        alert("✅ Documento actualizado correctamente");
      } else {
        await createDocumento(documento);
        alert("✅ Documento creado y aprobado correctamente");
      }
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
      setOpenModal(false);
    } catch (err) {
      alert(
        "❌ Error al guardar documento: " +
          (err.response?.data?.msg || err.message)
      );
    }
  };

  // 📌 Listado completo corregido
  const handlePrintListado = () => {
    if (!documentos || documentos.length === 0) {
      alert("⚠️ No hay documentos para imprimir");
      return;
    }

    const printWindow = window.open("", "_blank");
    const html = `
      <html>
        <head>
          <title>Listado de Documentos</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #000; padding: 4px; font-size: 12px; }
            th { background: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Listado de Documentos</h2>
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Artículo</th>
                <th>Cant.</th>
                <th>Descripción</th>
                <th>P. Unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${documentos
                .map(
                  (doc) =>
                    doc.articulos
                      .map(
                        (a, i) => `
                  <tr>
                    ${
                      i === 0
                        ? `<td rowspan="${doc.articulos.length}">${doc.nro}</td>
                           <td rowspan="${doc.articulos.length}">${new Date(
                            doc.fecha
                          ).toLocaleDateString()}</td>
                           <td rowspan="${doc.articulos.length}">${doc.cliente}</td>
                           <td rowspan="${doc.articulos.length}">${doc.estado}</td>`
                        : ""
                    }
                    <td>${a.producto}</td>
                    <td>${a.cantidad}</td>
                    <td>${a.descripcion}</td>
                    <td>$${a.precio.toFixed(2)}</td>
                    <td>$${(a.cantidad * a.precio).toFixed(2)}</td>
                  </tr>
                `
                      )
                      .join("")
                )
                .join("")}
            </tbody>
          </table>
          <script>window.print()</script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // 📌 Documento individual con encabezado ITELSA
  const handlePrintDoc = (doc) => {
    const printWindow = window.open("", "_blank");
    const html = `
      <html>
        <head>
          <title>Documento ${doc.nro}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .empresa { font-size: 14px; line-height: 1.4; margin-bottom: 20px; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #000; padding: 6px; font-size: 12px; }
            th { background: #f2f2f2; }
            .totales { text-align: right; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="empresa">
            <strong>ITELSA S.A.S.</strong><br/>
            Blvd. Cristóbal Berritella 7365, Los Boulevares.<br/>
            Córdoba - <br/>
            CUIT: 30-71592010-3 | Ing. Brutos: 2852831583
          </div>

          <h2>Documento ${doc.nro}</h2>
          <p><b>Fecha:</b> ${new Date(doc.fecha).toLocaleDateString()}</p>
          <p><b>Cliente:</b> ${doc.cliente}</p>
          <p><b>Estado:</b> ${doc.estado}</p>

          <table>
            <thead>
              <tr>
                <th>Artículo</th>
                <th>Cant.</th>
                <th>Descripción</th>
                <th>P. Unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${doc.articulos
                .map(
                  (a) => `
                <tr>
                  <td>${a.producto}</td>
                  <td>${a.cantidad}</td>
                  <td>${a.descripcion}</td>
                  <td>$${a.precio.toFixed(2)}</td>
                  <td>$${(a.cantidad * a.precio).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <p class="totales">TOTAL: $${doc.articulos
            .reduce((acc, i) => acc + i.cantidad * i.precio, 0)
            .toFixed(2)}</p>

          <script>window.print()</script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleEdit = (doc) => {
    setDocumento({ ...doc });
    setOpenModal(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestión de Documentos
      </Typography>

      {/* Tarjetas */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4} md={3}>
          <Card sx={{ bgcolor: "#e3f2fd", borderRadius: 3, boxShadow: 2 }}>
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
        <Grid item xs={12} sm={4} md={3}>
          <Card sx={{ bgcolor: "#fff3e0", borderRadius: 3, boxShadow: 2 }}>
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
        <Grid item xs={12} sm={4} md={3}>
          <Card sx={{ bgcolor: "#fce4ec", borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PeopleIcon sx={{ fontSize: 32, color: "#c2185b" }} />
                <Box>
                  <Typography variant="h6">Clientes</Typography>
                  <Typography variant="h4">{clientes.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Formulario */}
      <Paper sx={{ p: 3, mb: 3 }}>
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

        {/* Botones */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="outlined" startIcon={<AddIcon />} onClick={agregarFila}>
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
            onClick={handlePrintListado}
          >
            Imprimir Listado
          </Button>
        </Box>

        <Box sx={{ textAlign: "right", mt: 2, fontWeight: "bold" }}>
          TOTAL: ${calcularTotal().toFixed(2)}
        </Box>
      </Paper>

      {/* Listado */}
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
              <TableCell>Artículo</TableCell>
              <TableCell>Cant.</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>P. Unit.</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos.map((doc) =>
              doc.articulos.map((a, i) => (
                <TableRow key={doc._id + "-" + i}>
                  {i === 0 && (
                    <>
                      <TableCell rowSpan={doc.articulos.length}>{doc.nro}</TableCell>
                      <TableCell rowSpan={doc.articulos.length}>
                        {new Date(doc.fecha).toLocaleDateString()}
                      </TableCell>
                      <TableCell rowSpan={doc.articulos.length}>{doc.cliente}</TableCell>
                      <TableCell rowSpan={doc.articulos.length}>{doc.estado}</TableCell>
                    </>
                  )}
                  <TableCell>{a.producto}</TableCell>
                  <TableCell>{a.cantidad}</TableCell>
                  <TableCell>{a.descripcion}</TableCell>
                  <TableCell>${a.precio.toFixed(2)}</TableCell>
                  <TableCell>${(a.cantidad * a.precio).toFixed(2)}</TableCell>
                  {i === 0 && (
                    <TableCell rowSpan={doc.articulos.length}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handlePrintDoc(doc)}
                        >
                          PDF
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#115293" } }}
                          onClick={() => handleEdit(doc)}
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
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Modal de Edición */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="md"
        PaperProps={{ sx: { bgcolor: "#0d47a1", color: "white" } }}>
        <DialogTitle>Editar Documento</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Cliente"
            value={documento.cliente}
            onChange={(e) => setDocumento({ ...documento, cliente: e.target.value })}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="CUIT"
            value={documento.cuit}
            onChange={(e) => setDocumento({ ...documento, cuit: e.target.value })}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white" } }}
          />
          {documento.articulos.map((a, i) => (
            <Box key={i} sx={{ display: "flex", gap: 2, mt: 2 }}>
              <TextField
                label="Producto"
                value={a.producto}
                onChange={(e) => handleChange(i, "producto", e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                type="number"
                label="Cantidad"
                value={a.cantidad}
                onChange={(e) => handleChange(i, "cantidad", Number(e.target.value))}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                label="Descripción"
                value={a.descripcion}
                onChange={(e) => handleChange(i, "descripcion", e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <TextField
                type="number"
                label="Precio"
                value={a.precio}
                onChange={(e) => handleChange(i, "precio", Number(e.target.value))}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="inherit">Cancelar</Button>
          <Button onClick={handleApprove} color="success" variant="contained">Actualizar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminDocumentos;


