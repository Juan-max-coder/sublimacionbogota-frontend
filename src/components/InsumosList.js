// Lista de insumos con opciones de editar y eliminar
import React, { useEffect, useState } from "react";
import InsumosForm from "./InsumosForm";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function InsumosList() {
  const [insumos, setInsumos] = useState([]);
  const [insumoEditado, setInsumoEditado] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'https://sublimacionbogotaframework-production.up.railway.app';

  // Cargar insumos desde el backend al iniciar
  useEffect(() => {
    fetchWithToken(`${API_URL}/insumos`)
      .then((data) => {
        console.log("Insumos recibidos:", data);
        setInsumos(data);
      })
      .catch((err) => alert(err.message));
  }, [API_URL]);

  // Eliminar insumo por id
  const eliminarInsumo = async (id) => {
    try {
      await fetchWithToken(`${API_URL}/insumos/${id}`, { method: "DELETE" });
      setInsumos(insumos.filter((i) => i.idInsumo !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Guardar insumo nuevo o actualizado
  const guardarInsumo = (insumo) => {
    if (insumoEditado) {
      setInsumos(insumos.map((i) => (i.idInsumo === insumo.idInsumo ? insumo : i)));
      setInsumoEditado(null);
    } else {
      setInsumos([...insumos, insumo]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Insumos</h2>
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
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Costo</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Stock</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Precio</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Movimiento</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {insumos.map((i) => (
              <TableRow key={i.idInsumo} hover sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
                <TableCell>{i.nombreInsumo}</TableCell>
                <TableCell>{i.costoInsumo}</TableCell>
                <TableCell>{i.stockInsumo}</TableCell>
                <TableCell>{i.precioInsumo}</TableCell>
                <TableCell>{i.inventarioMovimientoIdMovimiento}</TableCell>
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
                    onClick={() => setInsumoEditado(i)}
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
                    onClick={() => eliminarInsumo(i.idInsumo)}
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
        <InsumosForm insumoEditado={insumoEditado} onSave={guardarInsumo} />
      </div>
    </div>
  );
}

export default InsumosList;