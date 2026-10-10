// Formulario para registrar y editar empleados
import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function EmpleadoForm({ empleadoEditado, onSave }) {
  const [empleado, setEmpleado] = useState({
    nombreEmpleado: "",
    cargoEmpleado: "",
    areaEmpleado: "",
    contactoEmpleado: "",
    usuarioIdUsuario: "",
  });

  useEffect(() => {
    if (empleadoEditado) {
      setEmpleado(empleadoEditado);
    }
  }, [empleadoEditado]);

  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = empleado.idEmpleado ? "PUT" : "POST";
    const API_URL = process.env.REACT_APP_API_URL || 'https://sublimacionbogotaframework-production.up.railway.app';
    const url = empleado.idEmpleado
      ? `${API_URL}/empleados/${empleado.idEmpleado}`
      : `${API_URL}/empleados`;

    try {
      const data = await fetchWithToken(url, {
        method,
        body: JSON.stringify(empleado),
      });
      onSave(data);
      setEmpleado({
        nombreEmpleado: "",
        cargoEmpleado: "",
        areaEmpleado: "",
        contactoEmpleado: "",
        usuarioIdUsuario: "",
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
        {empleado.idEmpleado ? "Editar Empleado" : "Registrar Empleado"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField name="nombreEmpleado" value={empleado.nombreEmpleado} onChange={handleChange} label="Nombre" variant="outlined" required />
        <TextField name="cargoEmpleado" value={empleado.cargoEmpleado} onChange={handleChange} label="Cargo" variant="outlined" required />
        <TextField name="areaEmpleado" value={empleado.areaEmpleado} onChange={handleChange} label="Área" variant="outlined" required />
        <TextField name="contactoEmpleado" value={empleado.contactoEmpleado} onChange={handleChange} label="Contacto" variant="outlined" required />
        <TextField name="usuarioIdUsuario" value={empleado.usuarioIdUsuario} onChange={handleChange} label="ID Usuario" variant="outlined" required />
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
          {empleado.idEmpleado ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default EmpleadoForm;