// Lista de detalles de pedido con opciones de editar y eliminar
import React, { useEffect, useState } from "react";
import DetallePedidoForm from "./DetallePedidoForm";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function DetallePedidoList() {
  const [detalles, setDetalles] = useState([]);
  const [detalleEditado, setDetalleEditado] = useState(null);

  // Cargar detalles desde el backend al iniciar
  useEffect(() => {
    fetchWithToken("http://localhost:8080/detalles")
      .then((data) => setDetalles(data))
      .catch((err) => alert(err.message));
  }, []);

  // Eliminar detalle por id
  const eliminarDetalle = async (id) => {
    try {
      await fetchWithToken(`http://localhost:8080/detalles/${id}`, { method: "DELETE" });
      setDetalles(detalles.filter((d) => d.idDetalle !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  // Guardar detalle nuevo o actualizado
  const guardarDetalle = (detalle) => {
    if (detalleEditado) {
      setDetalles(detalles.map((d) => (d.idDetalle === detalle.idDetalle ? detalle : d)));
      setDetalleEditado(null);
    } else {
      setDetalles([...detalles, detalle]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Detalles de Pedido</h2>

      {/* Tabla estilizada con Material UI */}
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
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Cantidad</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Precio Unitario</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Costo Mano de Obra</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Subtotal</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Pedido</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Material</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Insumo</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detalles.map((d) => (
              <TableRow
                key={d.idDetalle}
                hover
                sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}
              >
                <TableCell>{d.cantidadMaterial}</TableCell>
                <TableCell>{d.precioUnitarioMaterial}</TableCell>
                <TableCell>{d.costoManoDeObra}</TableCell>
                <TableCell>{d.subtotalPedido}</TableCell>
                <TableCell>{d.pedidoIdPedido}</TableCell>
                <TableCell>{d.materialIdMaterial}</TableCell>
                <TableCell>{d.insumosIdInsumo}</TableCell>
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
                    onClick={() => setDetalleEditado(d)}
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
                    onClick={() => eliminarDetalle(d.idDetalle)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Formulario para crear o editar detalle */}
      <div style={{ marginTop: "30px" }}>
        <DetallePedidoForm detalleEditado={detalleEditado} onSave={guardarDetalle} />
      </div>
    </div>
  );
}

export default DetallePedidoList;