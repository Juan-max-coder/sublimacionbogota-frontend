// Lista de movimientos de inventario con opciones de editar y eliminar
import React, { useEffect, useState } from "react";
import InventarioMovimientoForm from "./InventarioMovimientoForm";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function InventarioMovimientoList() {
  const [movimientos, setMovimientos] = useState([]);
  const [movimientoEditado, setMovimientoEditado] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'https://sublimacionbogotaframework-production.up.railway.app';

  useEffect(() => {
    fetchWithToken(`${API_URL}/movimientos`)
      .then((data) => {
        console.log("Movimientos recibidos:", data);
        setMovimientos(data);
      })
      .catch((err) => alert(err.message));
  }, [API_URL]);

  const eliminarMovimiento = async (id) => {
    try {
      await fetchWithToken(`${API_URL}/movimientos/${id}`, { method: "DELETE" });
      setMovimientos(movimientos.filter((m) => m.idMovimiento !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const guardarMovimiento = (movimiento) => {
    if (movimientoEditado) {
      setMovimientos(movimientos.map((m) => (m.idMovimiento === movimiento.idMovimiento ? movimiento : m)));
      setMovimientoEditado(null);
    } else {
      setMovimientos([...movimientos, movimiento]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Movimientos de Inventario</h2>
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
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tipo</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Cantidad</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Detalles del Material</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movimientos.map((m) => (
              <TableRow key={m.idMovimiento} hover sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
                <TableCell>{m.tipoMovimiento}</TableCell>
                <TableCell>{m.cantidadDelMovimiento}</TableCell>
                <TableCell>{m.detallesDelMaterialEnMovimiento}</TableCell>
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
                    onClick={() => setMovimientoEditado(m)}
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
                    onClick={() => eliminarMovimiento(m.idMovimiento)}
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
        <InventarioMovimientoForm movimientoEditado={movimientoEditado} onSave={guardarMovimiento} />
      </div>
    </div>
  );
}

export default InventarioMovimientoList;