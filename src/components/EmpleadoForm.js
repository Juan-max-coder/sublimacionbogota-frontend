// Formulario para registrar y editar empleados
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Box } from "@mui/material";

function EmpleadoForm({ empleadoEditado, onSave }) {
  // Estado inicial del formulario
  const [empleado, setEmpleado] = useState({
    nombreEmpleado: "",
    cargoEmpleado: "",
    areaEmpleado: "",
    contactoEmpleado: "",
    usuarioIdUsuario: ""
  });

  // Si recibo un empleado para editar, cargo sus datos en el formulario
  useEffect(() => {
    if (empleadoEditado) {
      setEmpleado(empleadoEditado);
    }
  }, [empleadoEditado]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  // Envío del formulario (crear o actualizar empleado)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = empleado.idEmpleado ? "PUT" : "POST";
    const url = empleado.idEmpleado 
      ? `http://localhost:8080/empleados/${empleado.idEmpleado}` 
      : "http://localhost:8080/empleados";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empleado)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data); // actualizo la lista
        // Reinicio el formulario
        setEmpleado({
          nombreEmpleado: "",
          cargoEmpleado: "",
          areaEmpleado: "",
          contactoEmpleado: "",
          usuarioIdUsuario: ""
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
            "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" }
          }}
        >
          {empleado.idEmpleado ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default EmpleadoForm;