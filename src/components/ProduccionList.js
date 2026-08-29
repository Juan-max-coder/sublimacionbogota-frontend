// Lista de producciones con opciones de editar y eliminar
import React, { useEffect, useState } from "react";
import ProduccionForm from "./ProduccionForm";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function ProduccionList() {
  const [producciones, setProducciones] = useState([]);
  const [produccionEditada, setProduccionEditada] = useState(null);

  // Cargar producciones desde el backend al iniciar
  useEffect(() => {
    fetchWithToken("http://localhost:8080/producciones")
      .then((data) => setProducciones(data))
      .catch((err) => alert(err.message));
  }, []);

  // Eliminar producción por id
  const eliminarProduccion = async (id) => {
    try {
      await fetchWithToken(`http://localhost:8080/producciones/${id}`, { method: "DELETE" });
      setProducciones(producciones.filter((p) => p.idProduccion !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Guardar producción nueva o actualizada
  const guardarProduccion = (produccion) => {
    if (produccionEditada) {
      setProducciones(producciones.map((p) => (p.idProduccion === produccion.idProduccion ? produccion : p)));
      setProduccionEditada(null);
    } else {
      setProducciones([...producciones, produccion]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Producciones</h2>
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
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha Inicio</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha Fin</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Pedido</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {producciones.map((p) => (
              <TableRow key={p.idProduccion} hover sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
                <TableCell>{p.fechaInicioProduccion ? new Date(p.fechaInicioProduccion).toLocaleString() : ""}</TableCell>
                <TableCell>{p.fechaFinProduccion ? new Date(p.fechaFinProduccion).toLocaleString() : ""}</TableCell>
                <TableCell>{p.estadoProduccion}</TableCell>
                <TableCell>{p.pedidoIdPedido}</TableCell>
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
                    onClick={() => setProduccionEditada(p)}
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
                    onClick={() => eliminarProduccion(p.idProduccion)}
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
        <ProduccionForm produccionEditada={produccionEditada} onSave={guardarProduccion} />
      </div>
    </div>
  );
}

export default ProduccionList;