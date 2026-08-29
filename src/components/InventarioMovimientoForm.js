// Formulario para registrar y editar movimientos de inventario
import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function InventarioMovimientoForm({ movimientoEditado, onSave }) {
  const [movimiento, setMovimiento] = useState({
    tipoMovimiento: "",
    cantidadDelMovimiento: "",
    detallesDelMaterialEnMovimiento: "",
  });

  useEffect(() => {
    if (movimientoEditado) {
      setMovimiento(movimientoEditado);
    }
  }, [movimientoEditado]);

  const handleChange = (e) => {
    setMovimiento({ ...movimiento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = movimiento.idMovimiento ? "PUT" : "POST";
    const url = movimiento.idMovimiento
      ? `http://localhost:8080/movimientos/${movimiento.idMovimiento}`
      : "http://localhost:8080/movimientos";

    try {
      const data = await fetchWithToken(url, {
        method,
        body: JSON.stringify(movimiento),
      });
      onSave(data);
      setMovimiento({
        tipoMovimiento: "",
        cantidadDelMovimiento: "",
        detallesDelMaterialEnMovimiento: "",
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
        {movimiento.idMovimiento ? "Editar Movimiento" : "Registrar Movimiento"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField name="tipoMovimiento" value={movimiento.tipoMovimiento} onChange={handleChange} label="Tipo de Movimiento" variant="outlined" required />
        <TextField type="number" name="cantidadDelMovimiento" value={movimiento.cantidadDelMovimiento} onChange={handleChange} label="Cantidad" variant="outlined" required />
        <TextField name="detallesDelMaterialEnMovimiento" value={movimiento.detallesDelMaterialEnMovimiento} onChange={handleChange} label="Detalles del Material" variant="outlined" required />
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
          {movimiento.idMovimiento ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default InventarioMovimientoForm;