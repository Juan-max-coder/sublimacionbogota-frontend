// Lista de cuentas con opciones de editar y eliminar
import React, { useEffect, useState } from "react";
import CuentaForm from "./CuentaForm";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function CuentaList() {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaEditada, setCuentaEditada] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'https://sublimacionbogotaframework-production.up.railway.app';

  useEffect(() => {
    fetchWithToken(`${API_URL}/usuarios`)
      .then((data) => setCuentas(data))
      .catch((err) => alert(err.message));
  }, [API_URL]);

  const eliminarCuenta = async (id) => {
    try {
      await fetchWithToken(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
      setCuentas(cuentas.filter((c) => c.idUsuario !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const guardarCuenta = (cuenta) => {
    if (cuentaEditada) {
      setCuentas(cuentas.map((c) => (c.idUsuario === cuenta.idUsuario ? cuenta : c)));
      setCuentaEditada(null);
    } else {
      setCuentas([...cuentas, cuenta]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Cuentas</h2>
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
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Apellido</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Correo</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Rol</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuentas.map((c) => (
              <TableRow key={c.idUsuario} hover sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
                <TableCell>{c.nombreUsuario}</TableCell>
                <TableCell>{c.apellidoUsuario}</TableCell>
                <TableCell>{c.correoUsuario}</TableCell>
                <TableCell>{c.rolUsuario}</TableCell>
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
                    onClick={() => setCuentaEditada(c)}
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
                    onClick={() => eliminarCuenta(c.idUsuario)}
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
        <CuentaForm cuentaEditada={cuentaEditada} onSave={guardarCuenta} />
      </div>
    </div>
  );
}

export default CuentaList;