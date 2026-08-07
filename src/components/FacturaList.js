// Lista de facturas con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import FacturaForm from './FacturaForm';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";

function FacturaList() {
  // Estado para la lista de facturas y la factura que se edita
  const [facturas, setFacturas] = useState([]);
  const [facturaEditada, setFacturaEditada] = useState(null);

  // Cargar facturas desde el backend al iniciar
  useEffect(() => {
    fetch("http://localhost:8080/facturas")
      .then(res => res.json())
      .then(data => setFacturas(data));
  }, []);

  // Eliminar factura por id
  const eliminarFactura = (id) => {
    fetch(`http://localhost:8080/facturas/${id}`, { method: "DELETE" })
      .then(() => setFacturas(facturas.filter(f => f.idFactura !== id)));
  };

  // Guardar factura nueva o actualizada
  const guardarFactura = (factura) => {
    if (facturaEditada) {
      setFacturas(facturas.map(f => f.idFactura === factura.idFactura ? factura : f));
      setFacturaEditada(null);
    } else {
      setFacturas([...facturas, factura]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Facturas</h2>

      {/* Tabla estilizada con Material UI */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          background: "linear-gradient(135deg, #fdfbfb, #ebedee)"
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2c3e50" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha Exportación</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha Confirmación</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Pedido</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facturas.map(f => (
              <TableRow
                key={f.idFactura}
                hover
                sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}
              >
                <TableCell>{f.estadoFactura}</TableCell>
                <TableCell>{f.fechaExportacionFactura}</TableCell>
                <TableCell>{f.fechaConfirmacionFactura}</TableCell>
                <TableCell>{f.pedidoIdPedido}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      mr: 1,
                      borderRadius: "8px",
                      background: "linear-gradient(90deg, #1abc9c, #16a085)",
                      color: "#fff",
                      "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" }
                    }}
                    onClick={() => setFacturaEditada(f)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "8px",
                      background: "linear-gradient(90deg, #e74c3c, #c0392b)",
                      color: "#fff",
                      "&:hover": { background: "linear-gradient(90deg, #c0392b, #e74c3c)" }
                    }}
                    onClick={() => eliminarFactura(f.idFactura)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Formulario para crear o editar factura */}
      <div style={{ marginTop: "30px" }}>
        <FacturaForm facturaEditada={facturaEditada} onSave={guardarFactura} />
      </div>
    </div>
  );
}

export default FacturaList;