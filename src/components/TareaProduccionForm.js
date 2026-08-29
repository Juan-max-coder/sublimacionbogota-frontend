// Formulario para registrar y editar tareas de producción
import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function TareaProduccionForm({ tareaEditada, onSave }) {
  const [tarea, setTarea] = useState({
    descripcionTarea: "",
    estadoTarea: "",
    avanceTarea: "",
    empleadoIdEmpleado: "",
    produccionIdProduccion: "",
  });

  useEffect(() => {
    if (tareaEditada) {
      setTarea(tareaEditada);
    }
  }, [tareaEditada]);

  const handleChange = (e) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = tarea.idTarea ? "PUT" : "POST";
    const url = tarea.idTarea
      ? `http://localhost:8080/tareas/${tarea.idTarea}`
      : "http://localhost:8080/tareas";

    try {
      const data = await fetchWithToken(url, {
        method,
        body: JSON.stringify(tarea),
      });
      onSave(data);
      setTarea({
        descripcionTarea: "",
        estadoTarea: "",
        avanceTarea: "",
        empleadoIdEmpleado: "",
        produccionIdProduccion: "",
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
        {tarea.idTarea ? "Editar Tarea" : "Registrar Tarea"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField name="descripcionTarea" value={tarea.descripcionTarea} onChange={handleChange} label="Descripción" required />
        <TextField name="estadoTarea" value={tarea.estadoTarea} onChange={handleChange} label="Estado" required />
        <TextField type="number" name="avanceTarea" value={tarea.avanceTarea} onChange={handleChange} label="Avance (%)" required />
        <TextField name="empleadoIdEmpleado" value={tarea.empleadoIdEmpleado} onChange={handleChange} label="ID Empleado" required />
        <TextField name="produccionIdProduccion" value={tarea.produccionIdProduccion} onChange={handleChange} label="ID Producción" required />
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
          {tarea.idTarea ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default TareaProduccionForm;