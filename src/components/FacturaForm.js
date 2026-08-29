// Formulario para registrar y editar facturas
import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function FacturaForm({ facturaEditada, onSave }) {
  const [factura, setFactura] = useState({
    estadoFactura: "",
    fechaExportacionFactura: "",
    fechaConfirmacionFactura: "",
    pedidoIdPedido: "",
  });

  useEffect(() => {
    if (facturaEditada) {
      setFactura({
        ...facturaEditada,
        fechaExportacionFactura: facturaEditada.fechaExportacionFactura
          ? new Date(facturaEditada.fechaExportacionFactura).toISOString().slice(0, 16)
          : "",
        fechaConfirmacionFactura: facturaEditada.fechaConfirmacionFactura
          ? new Date(facturaEditada.fechaConfirmacionFactura).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [facturaEditada]);

  const handleChange = (e) => {
    setFactura({ ...factura, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = factura.idFactura ? "PUT" : "POST";
    const url = factura.idFactura
      ? `http://localhost:8080/facturas/${factura.idFactura}`
      : "http://localhost:8080/facturas";

    const facturaEnviar = {
      ...factura,
      fechaExportacionFactura: factura.fechaExportacionFactura
        ? new Date(factura.fechaExportacionFactura)
        : null,
      fechaConfirmacionFactura: factura.fechaConfirmacionFactura
        ? new Date(factura.fechaConfirmacionFactura)
        : null,
    };

    try {
      const data = await fetchWithToken(url, {
        method,
        body: JSON.stringify(facturaEnviar),
      });
      onSave(data);
      setFactura({
        estadoFactura: "",
        fechaExportacionFactura: "",
        fechaConfirmacionFactura: "",
        pedidoIdPedido: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        {factura.idFactura ? "Editar Factura" : "Registrar Factura"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField name="estadoFactura" value={factura.estadoFactura} onChange={handleChange} label="Estado" variant="outlined" required />
        <TextField type="datetime-local" name="fechaExportacionFactura" value={factura.fechaExportacionFactura} onChange={handleChange} label="Fecha Exportación" InputLabelProps={{ shrink: true }} />
        <TextField type="datetime-local" name="fechaConfirmacionFactura" value={factura.fechaConfirmacionFactura} onChange={handleChange} label="Fecha Confirmación" InputLabelProps={{ shrink: true }} />
        <TextField name="pedidoIdPedido" value={factura.pedidoIdPedido} onChange={handleChange} label="ID Pedido" variant="outlined" required />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: "8px",
            background: "linear-gradient(90deg, #1abc9c, #16a085)",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" },
          }}
        >
          {factura.idFactura ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default FacturaForm;