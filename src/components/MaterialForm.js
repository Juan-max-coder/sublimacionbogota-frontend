// Formulario para registrar y editar materiales
import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function MaterialForm({ materialEditado, onSave }) {
  const [material, setMaterial] = useState({
    nombreMaterial: "",
    tipoMaterial: "",
    colorMaterial: "",
    cantidadDisponibleMaterial: "",
    clienteIdCliente: "",
  });

  useEffect(() => {
    if (materialEditado) {
      setMaterial(materialEditado);
    }
  }, [materialEditado]);

  const handleChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = material.idMaterial ? "PUT" : "POST";
    const API_URL = process.env.REACT_APP_API_URL || 'https://sublimacionbogotaframework-production.up.railway.app';
    const url = material.idMaterial
      ? `${API_URL}/materiales/${material.idMaterial}`
      : `${API_URL}/materiales`;

    try {
      const data = await fetchWithToken(url, {
        method,
        body: JSON.stringify(material),
      });
      onSave(data);
      setMaterial({
        nombreMaterial: "",
        tipoMaterial: "",
        colorMaterial: "",
        cantidadDisponibleMaterial: "",
        clienteIdCliente: "",
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
        {material.idMaterial ? "Editar Material" : "Registrar Material"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField name="nombreMaterial" value={material.nombreMaterial} onChange={handleChange} label="Nombre" variant="outlined" required />
        <TextField name="tipoMaterial" value={material.tipoMaterial} onChange={handleChange} label="Tipo" variant="outlined" required />
        <TextField name="colorMaterial" value={material.colorMaterial} onChange={handleChange} label="Color" variant="outlined" required />
        <TextField type="number" name="cantidadDisponibleMaterial" value={material.cantidadDisponibleMaterial} onChange={handleChange} label="Cantidad Disponible" variant="outlined" required />
        <TextField name="clienteIdCliente" value={material.clienteIdCliente} onChange={handleChange} label="ID Cliente" variant="outlined" required />
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
          {material.idMaterial ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default MaterialForm;