// Formulario para registrar y editar insumos
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Box } from "@mui/material";

function InsumosForm({ insumoEditado, onSave }) {
  // Estado inicial del formulario
  const [insumo, setInsumo] = useState({
    nombreInsumo: "",
    costoInsumo: "",
    stockInsumo: "",
    precioInsumo: "",
    inventarioMovimientoIdMovimiento: ""
  });

  // Si recibo un insumo para editar, cargo sus datos en el formulario
  useEffect(() => {
    if (insumoEditado) {
      setInsumo(insumoEditado);
    }
  }, [insumoEditado]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setInsumo({ ...insumo, [e.target.name]: e.target.value });
  };

  // Envío del formulario (crear o actualizar insumo)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = insumo.idInsumo ? "PUT" : "POST";
    const url = insumo.idInsumo 
      ? `http://localhost:8080/insumos/${insumo.idInsumo}` 
      : "http://localhost:8080/insumos";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(insumo)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data); // actualizo la lista
        // Reinicio el formulario
        setInsumo({
          nombreInsumo: "",
          costoInsumo: "",
          stockInsumo: "",
          precioInsumo: "",
          inventarioMovimientoIdMovimiento: ""
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
        {insumo.idInsumo ? "Editar Insumo" : "Registrar Insumo"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField name="nombreInsumo" value={insumo.nombreInsumo} onChange={handleChange} label="Nombre" variant="outlined" required />
        <TextField type="number" name="costoInsumo" value={insumo.costoInsumo} onChange={handleChange} label="Costo" variant="outlined" required />
        <TextField type="number" name="stockInsumo" value={insumo.stockInsumo} onChange={handleChange} label="Stock" variant="outlined" required />
        <TextField type="number" name="precioInsumo" value={insumo.precioInsumo} onChange={handleChange} label="Precio" variant="outlined" required />
        <TextField name="inventarioMovimientoIdMovimiento" value={insumo.inventarioMovimientoIdMovimiento} onChange={handleChange} label="ID Movimiento" variant="outlined" required />
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
          {insumo.idInsumo ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default InsumosForm;