// Lista de pedidos con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import PedidoForm from './PedidoForm';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

function PedidoList() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoEditado, setPedidoEditado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/pedidos")
      .then(res => res.json())
      .then(data => setPedidos(data));
  }, []);

  const eliminarPedido = (id) => {
    fetch(`http://localhost:8080/pedidos/${id}`, { method: "DELETE" })
      .then(() => setPedidos(pedidos.filter(p => p.idPedido !== id)));
  };

  const guardarPedido = (pedido) => {
    if (pedidoEditado) {
      setPedidos(pedidos.map(p => p.idPedido === pedido.idPedido ? pedido : p));
      setPedidoEditado(null);
    } else {
      setPedidos([...pedidos, pedido]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Pedidos</h2>
      <TableContainer component={Paper} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", background: "linear-gradient(135deg, #fdfbfb, #ebedee)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2c3e50" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha Registro</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Prioridad</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha Entrega Estimada</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Material</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Cliente</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Empleado</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map(p => (
              <TableRow key={p.idPedido} hover sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
                <TableCell>{p.fechaRegistroPedido ? new Date(p.fechaRegistroPedido).toLocaleString() : ""}</TableCell>
                <TableCell>{p.estadoPedido}</TableCell>
                <TableCell>{p.prioridadPedido}</TableCell>
                <TableCell>{p.fechaEntregaEstimadaPedido ? new Date(p.fechaEntregaEstimadaPedido).toLocaleString() : ""}</TableCell>
                <TableCell>{p.materialIdMaterial}</TableCell>
                <TableCell>{p.clienteIdCliente}</TableCell>
                <TableCell>{p.empleadoIdEmpleado}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{ mr: 1, borderRadius: "8px", background: "linear-gradient(90deg, #1abc9c, #16a085)", color: "#fff", "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" } }} onClick={() => setPedidoEditado(p)}>
                    Editar
                  </Button>
                  <Button variant="contained" sx={{ borderRadius: "8px", background: "linear-gradient(90deg, #e74c3c, #c0392b)", color: "#fff", "&:hover": { background: "linear-gradient(90deg, #c0392b, #e74c3c)" } }} onClick={() => eliminarPedido(p.idPedido)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Formulario para crear o editar pedido */}
      <div style={{ marginTop: "30px" }}>
        <PedidoForm pedidoEditado={pedidoEditado} onSave={guardarPedido} />
      </div>
    </div>
  );
}

export default PedidoList;