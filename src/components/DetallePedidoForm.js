// Formulario para registrar y editar detalles de pedido
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Box } from "@mui/material";

function DetallePedidoForm({ detalleEditado, onSave }) {
  // Estado inicial del formulario
  const [detalle, setDetalle] = useState({
    cantidadMaterial: "",
    precioUnitarioMaterial: "",
    costoManoDeObra: "",
    subtotalPedido: "",
    pedidoIdPedido: "",
    materialIdMaterial: "",
    insumosIdInsumo: ""
  });

  // Si recibo un detalle para editar, cargo sus datos en el formulario
  useEffect(() => {
    if (detalleEditado) {
      setDetalle(detalleEditado);
    }
  }, [detalleEditado]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setDetalle({ ...detalle, [e.target.name]: e.target.value });
  };

  // Envío del formulario (crear o actualizar detalle)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = detalle.idDetalle ? "PUT" : "POST";
    const url = detalle.idDetalle 
      ? `http://localhost:8080/detalles/${detalle.idDetalle}` 
      : "http://localhost:8080/detalles";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detalle)
    })
    .then(res => res.json())
    .then(data => {
      onSave(data); // actualizo la lista
      // Reinicio el formulario
      setDetalle({
        cantidadMaterial: "",
        precioUnitarioMaterial: "",
        costoManoDeObra: "",
        subtotalPedido: "",
        pedidoIdPedido: "",
        materialIdMaterial: "",
        insumosIdInsumo: ""
      });
    });
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        background: "linear-gradient(135deg, #ffffff, #f0f0f0)"
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
            "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" }
          }}
        >
          {detalle.idDetalle ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default DetallePedidoForm;