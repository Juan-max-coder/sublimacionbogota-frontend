// Formulario para registrar y editar clientes
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Box } from "@mui/material";

function ClienteForm({ clienteEditado, onSave }) {
  // Estado inicial del formulario
  const [cliente, setCliente] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    direccionCliente: "",
    telefonoCliente: "",
    correoCliente: "",
    tipoCliente: ""
  });

  // Si recibo un cliente para editar, cargo sus datos en el formulario
  useEffect(() => {
    if (clienteEditado) {
      setCliente(clienteEditado);
    }
  }, [clienteEditado]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  // Envío del formulario (crear o actualizar cliente)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = cliente.idCliente ? "PUT" : "POST";
    const url = cliente.idCliente 
      ? `http://localhost:8080/clientes/${cliente.idCliente}` 
      : "http://localhost:8080/clientes";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    })
    .then(res => res.json())
    .then(data => {
      onSave(data); // actualizo la lista
      // Reinicio el formulario
      setCliente({
        nombreCliente: "",
        apellidoCliente: "",
        direccionCliente: "",
        telefonoCliente: "",
        correoCliente: "",
        tipoCliente: ""
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
        {cliente.idCliente ? "Editar Cliente" : "Registrar Cliente"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField name="nombreCliente" value={cliente.nombreCliente} onChange={handleChange} label="Nombre" variant="outlined" />
        <TextField name="apellidoCliente" value={cliente.apellidoCliente} onChange={handleChange} label="Apellido" variant="outlined" />
        <TextField name="direccionCliente" value={cliente.direccionCliente} onChange={handleChange} label="Dirección" variant="outlined" />
        <TextField name="telefonoCliente" value={cliente.telefonoCliente} onChange={handleChange} label="Teléfono" variant="outlined" />
        <TextField name="correoCliente" value={cliente.correoCliente} onChange={handleChange} label="Correo" variant="outlined" />
        <TextField name="tipoCliente" value={cliente.tipoCliente} onChange={handleChange} label="Tipo Cliente" variant="outlined" />
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
          {cliente.idCliente ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default ClienteForm;