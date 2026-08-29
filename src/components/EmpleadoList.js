// Lista de empleados con opciones de editar y eliminar
import React, { useEffect, useState } from "react";
import EmpleadoForm from "./EmpleadoForm";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function EmpleadoList() {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoEditado, setEmpleadoEditado] = useState(null);

  // Cargar empleados desde el backend al iniciar
  useEffect(() => {
    fetchWithToken("http://localhost:8080/empleados")
      .then((data) => {
        console.log("Empleados recibidos:", data);
        setEmpleados(data);
      })
      .catch((err) => alert(err.message));
  }, []);

  // Eliminar empleado por id
  const eliminarEmpleado = async (id) => {
    try {
      await fetchWithToken(`http://localhost:8080/empleados/${id}`, { method: "DELETE" });
      setEmpleados(empleados.filter((e) => e.idEmpleado !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Guardar empleado nuevo o actualizado
  const guardarEmpleado = (empleado) => {
    if (empleadoEditado) {
      setEmpleados(empleados.map((e) => (e.idEmpleado === empleado.idEmpleado ? empleado : e)));
      setEmpleadoEditado(null);
    } else {
      setEmpleados([...empleados, empleado]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Empleados</h2>
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
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Cargo</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Área</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Contacto</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Usuario</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empleados.map((e) => (
              <TableRow key={e.idEmpleado} hover sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
                <TableCell>{e.nombreEmpleado}</TableCell>
                <TableCell>{e.cargoEmpleado}</TableCell>
                <TableCell>{e.areaEmpleado}</TableCell>
                <TableCell>{e.contactoEmpleado}</TableCell>
                <TableCell>{e.usuarioIdUsuario}</TableCell>
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
                    onClick={() => setEmpleadoEditado(e)}
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
                    onClick={() => eliminarEmpleado(e.idEmpleado)}
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
        <EmpleadoForm empleadoEditado={empleadoEditado} onSave={guardarEmpleado} />
      </div>
    </div>
  );
}

export default EmpleadoList;