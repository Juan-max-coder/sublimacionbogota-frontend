// Formulario para registrar y editar detalles de pedido
import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function DetallePedidoForm({ detalleEditado, onSave }) {
  const [detalle, setDetalle] = useState({
    cantidadMaterial: "",
    precioUnitarioMaterial: "",
    costoManoDeObra: "",
    subtotalPedido: "",
    pedidoIdPedido: "",
    materialIdMaterial: "",
    insumosIdInsumo: "",
  });

  useEffect(() => {
    if (detalleEditado) {
      setDetalle(detalleEditado);
    }
  }, [detalleEditado]);

  const handleChange = (e) => {
    setDetalle({ ...detalle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = detalle.idDetalle ? "PUT" : "POST";
    const API_URL = process.env.REACT_APP_API_URL || 'https://sublimacionbogotaframework-production.up.railway.app';
    const url = detalle.idDetalle
      ? `${API_URL}/detalles/${detalle.idDetalle}`
      : `${API_URL}/detalles`;

    try {
      const data = await fetchWithToken(url, {
        method,
        body: JSON.stringify(detalle),
      });
      onSave(data);
      setDetalle({
        cantidadMaterial: "",
        precioUnitarioMaterial: "",
        costoManoDeObra: "",
        subtotalPedido: "",
        pedidoIdPedido: "",
        materialIdMaterial: "",
        insumosIdInsumo: "",
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
        {detalle.idDetalle ? "Editar Detalle" : "Registrar Detalle"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField name="cantidadMaterial" value={detalle.cantidadMaterial} onChange={handleChange} label="Cantidad Material" variant="outlined" />
        <TextField name="precioUnitarioMaterial" value={detalle.precioUnitarioMaterial} onChange={handleChange} label="Precio Unitario" variant="outlined" />
        <TextField name="costoManoDeObra" value={detalle.costoManoDeObra} onChange={handleChange} label="Costo Mano de Obra" variant="outlined" />
        <TextField name="subtotalPedido" value={detalle.subtotalPedido} onChange={handleChange} label="Subtotal Pedido" variant="outlined" />
        <TextField name="pedidoIdPedido" value={detalle.pedidoIdPedido} onChange={handleChange} label="ID Pedido" variant="outlined" />
        <TextField name="materialIdMaterial" value={detalle.materialIdMaterial} onChange={handleChange} label="ID Material" variant="outlined" />
        <TextField name="insumosIdInsumo" value={detalle.insumosIdInsumo} onChange={handleChange} label="ID Insumo" variant="outlined" />
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
          {detalle.idDetalle ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default DetallePedidoForm;