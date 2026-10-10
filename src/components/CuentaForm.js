// Formulario para registrar y editar cuentas (usuarios del sistema)
import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function CuentaForm({ cuentaEditada, onSave }) {
  const [cuenta, setCuenta] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    correoUsuario: "",
    contrasenaUsuario: "",
    rolUsuario: "",
    estadoUsuario: true,
    empleado: null,
  });

  useEffect(() => {
    if (cuentaEditada) {
      setCuenta(cuentaEditada);
    }
  }, [cuentaEditada]);

  const handleChange = (e) => {
    setCuenta({ ...cuenta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = cuenta.idUsuario ? "PUT" : "POST";
    const API_URL = process.env.REACT_APP_API_URL || 'https://sublimacionbogotaframework-production.up.railway.app';
    const url = cuenta.idUsuario
      ? `${API_URL}/usuarios/${cuenta.idUsuario}`
      : `${API_URL}/usuarios`;

    try {
      const data = await fetchWithToken(url, {
        method,
        body: JSON.stringify(cuenta),
      });
      onSave(data);
      setCuenta({
        nombreUsuario: "",
        apellidoUsuario: "",
        correoUsuario: "",
        contrasenaUsuario: "",
        rolUsuario: "",
        estadoUsuario: true,
        empleado: null,
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
        {cuenta.idUsuario ? "Editar Cuenta" : "Registrar Cuenta"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField name="nombreUsuario" value={cuenta.nombreUsuario} onChange={handleChange} label="Nombre" required />
        <TextField name="apellidoUsuario" value={cuenta.apellidoUsuario} onChange={handleChange} label="Apellido" required />
        <TextField type="email" name="correoUsuario" value={cuenta.correoUsuario} onChange={handleChange} label="Correo" required />
        <TextField type="password" name="contrasenaUsuario" value={cuenta.contrasenaUsuario} onChange={handleChange} label="Contraseña" required />
        <TextField name="rolUsuario" value={cuenta.rolUsuario} onChange={handleChange} label="Rol" required />
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
          {cuenta.idUsuario ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default CuentaForm;