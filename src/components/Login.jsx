import React, { useState } from "react";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";

function Login({ onLogin }) {
  const [modoRegistro, setModoRegistro] = useState(false);
  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    correoUsuario: "",
    contrasenaUsuario: "",
    rolUsuario: "EMPLEADO",
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = modoRegistro
      ? "http://localhost:8080/auth/register"
      : "http://localhost:8080/auth/login";

    const body = modoRegistro
      ? JSON.stringify(usuario)
      : JSON.stringify({
          correoUsuario: usuario.correoUsuario,
          contrasenaUsuario: usuario.contrasenaUsuario,
        });

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (modoRegistro) {
          alert(data.mensaje || "Registro exitoso");
          setModoRegistro(false);
          setUsuario({
            nombreUsuario: "",
            apellidoUsuario: "",
            correoUsuario: "",
            contrasenaUsuario: "",
            rolUsuario: "EMPLEADO",
          });
        } else if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("rolUsuario", data.rolUsuario);
          onLogin(data.rolUsuario);
        } else {
          alert("Credenciales incorrectas");
        }
      })
      .catch(() => alert("Error al conectar con el servidor"));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #56effa, #447df8)",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: "400px",
          textAlign: "center",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          background: "linear-gradient(135deg, #ffffff, #f0f0f0)",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {modoRegistro ? "Crear Cuenta" : "Iniciar Sesión"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          {modoRegistro && (
            <>
              <TextField name="nombreUsuario" label="Nombre" value={usuario.nombreUsuario} onChange={handleChange} required />
              <TextField name="apellidoUsuario" label="Apellido" value={usuario.apellidoUsuario} onChange={handleChange} required />
            </>
          )}
          <TextField name="correoUsuario" label="Correo" type="email" value={usuario.correoUsuario} onChange={handleChange} required />
          <TextField name="contrasenaUsuario" label="Contraseña" type="password" value={usuario.contrasenaUsuario} onChange={handleChange} required />
          {modoRegistro && (
            <TextField name="rolUsuario" label="Rol" value={usuario.rolUsuario} onChange={handleChange} required />
          )}
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
            {modoRegistro ? "Registrar" : "Entrar"}
          </Button>
        </Box>

        <Button
          onClick={() => setModoRegistro(!modoRegistro)}
          sx={{
            mt: 2,
            color: "#16a085",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          {modoRegistro ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;