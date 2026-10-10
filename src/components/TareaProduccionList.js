// Lista de tareas de producción con opciones de editar y eliminar
import React, { useEffect, useState } from "react";
import TareaProduccionForm from "./TareaProduccionForm";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function TareaProduccionList() {
  const [tareas, setTareas] = useState([]);
  const [tareaEditada, setTareaEditada] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'https://sublimacionbogotaframework-production.up.railway.app';

  useEffect(() => {
    fetchWithToken(`${API_URL}/tareas`)
      .then((data) => setTareas(data))
      .catch((err) => alert(err.message));
  }, [API_URL]);

  const eliminarTarea = async (id) => {
    try {
      await fetchWithToken(`${API_URL}/tareas/${id}`, { method: "DELETE" });
      setTareas(tareas.filter((t) => t.idTarea !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const guardarTarea = (tarea) => {
    if (tareaEditada) {
      setTareas(tareas.map((t) => (t.idTarea === tarea.idTarea ? tarea : t)));
      setTareaEditada(null);
    } else {
      setTareas([...tareas, tarea]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Tareas de Producción</h2>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2c3e50" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Descripción</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Avance (%)</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Empleado</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Producción</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tareas.map((t) => (
              <TableRow key={t.idTarea} hover sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
                <TableCell>{t.descripcionTarea}</TableCell>
                <TableCell>{t.estadoTarea}</TableCell>
                <TableCell>{t.avanceTarea}</TableCell>
                <TableCell>{t.empleadoIdEmpleado}</TableCell>
                <TableCell>{t.produccionIdProduccion}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      mr: 1,
                      borderRadius: "8px",
                      background: "linear-gradient(90deg, #1abc9c, #16a085)",
                      color: "#fff",
                      "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" },
                    }}
                    onClick={() => setTareaEditada(t)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "8px",
                      background: "linear-gradient(90deg, #e74c3c, #c0392b)",
                      color: "#fff",
                      "&:hover": { background: "linear-gradient(90deg, #c0392b, #e74c3c)" },
                    }}
                    onClick={() => eliminarTarea(t.idTarea)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "30px" }}>
        <TareaProduccionForm tareaEditada={tareaEditada} onSave={guardarTarea} />
      </div>
    </div>
  );
}

export default TareaProduccionList;