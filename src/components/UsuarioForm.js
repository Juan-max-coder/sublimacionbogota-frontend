// Formulario para registrar y editar usuarios
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Box } from "@mui/material";

function UsuarioForm({ usuarioEditado, onSave }) {
  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    correoUsuario: "",
    contrasenaUsuario: "",
    rolUsuario: ""
  });

  useEffect(() => {
    if (usuarioEditado) {
      setUsuario(usuarioEditado);
    }
  }, [usuarioEditado]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = usuario.idUsuario ? "PUT" : "POST";
    const url = usuario.idUsuario 
      ? `http://localhost:8080/usuarios/${usuario.idUsuario}` 
      : "http://localhost:8080/usuarios";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data);
        setUsuario({
          nombreUsuario: "",
          apellidoUsuario: "",
          correoUsuario: "",
          contrasenaUsuario: "",
          rolUsuario: ""
        });
      });
  };

  return (
    <Paper sx={{ p: 3, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", background: "linear-gradient(135deg, #ffffff, #f0f0f0)" }}>
      <h2 style={{ marginBottom: "20px" }}>
        {usuario.idUsuario ? "Editar Usuario" : "Registrar Usuario"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField name="nombreUsuario" value={usuario.nombreUsuario} onChange={handleChange} label="Nombre" required />
        <TextField name="apellidoUsuario" value={usuario.apellidoUsuario} onChange={handleChange} label="Apellido" required />
        <TextField type="email" name="correoUsuario" value={usuario.correoUsuario} onChange={handleChange} label="Correo" required />
        <TextField type="password" name="contrasenaUsuario" value={usuario.contrasenaUsuario} onChange={handleChange} label="Contraseña" required />
        <TextField name="rolUsuario" value={usuario.rolUsuario} onChange={handleChange} label="Rol" required />
        <Button type="submit" variant="contained" sx={{ mt: 2, borderRadius: "8px", background: "linear-gradient(90deg, #1abc9c, #16a085)", color: "#fff", fontWeight: "bold", "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" } }}>
          {usuario.idUsuario ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default UsuarioForm;