// Formulario para registrar y editar producciones
import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function ProduccionForm({ produccionEditada, onSave }) {
  const [produccion, setProduccion] = useState({
    fechaInicioProduccion: "",
    fechaFinProduccion: "",
    estadoProduccion: "",
    pedidoIdPedido: "",
  });

  useEffect(() => {
    if (produccionEditada) {
      setProduccion({
        ...produccionEditada,
        fechaInicioProduccion: produccionEditada.fechaInicioProduccion
          ? new Date(produccionEditada.fechaInicioProduccion).toISOString().slice(0, 16)
          : "",
        fechaFinProduccion: produccionEditada.fechaFinProduccion
          ? new Date(produccionEditada.fechaFinProduccion).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [produccionEditada]);

  const handleChange = (e) => {
    setProduccion({ ...produccion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = produccion.idProduccion ? "PUT" : "POST";
    const API_URL = process.env.REACT_APP_API_URL || 'https://sublimacionbogotaframework-production.up.railway.app';
    const url = produccion.idProduccion
      ? `${API_URL}/producciones/${produccion.idProduccion}`
      : `${API_URL}/producciones`;

    const produccionEnviar = {
      ...produccion,
      fechaInicioProduccion: produccion.fechaInicioProduccion ? new Date(produccion.fechaInicioProduccion) : null,
      fechaFinProduccion: produccion.fechaFinProduccion ? new Date(produccion.fechaFinProduccion) : null,
    };

    try {
      const data = await fetchWithToken(url, {
        method,
        body: JSON.stringify(produccionEnviar),
      });
      onSave(data);
      setProduccion({
        fechaInicioProduccion: "",
        fechaFinProduccion: "",
        estadoProduccion: "",
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
        {produccion.idProduccion ? "Editar Producción" : "Registrar Producción"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          type="datetime-local"
          name="fechaInicioProduccion"
          value={produccion.fechaInicioProduccion}
          onChange={handleChange}
          label="Fecha Inicio"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="datetime-local"
          name="fechaFinProduccion"
          value={produccion.fechaFinProduccion}
          onChange={handleChange}
          label="Fecha Fin"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="estadoProduccion"
          value={produccion.estadoProduccion}
          onChange={handleChange}
          label="Estado"
          required
        />
        <TextField
          name="pedidoIdPedido"
          value={produccion.pedidoIdPedido}
          onChange={handleChange}
          label="ID Pedido"
          required
        />
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
          {produccion.idProduccion ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default ProduccionForm;