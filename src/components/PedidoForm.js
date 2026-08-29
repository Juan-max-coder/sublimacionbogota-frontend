// Formulario para registrar y editar pedidos
import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function PedidoForm({ pedidoEditado, onSave }) {
  const [pedido, setPedido] = useState({
    fechaRegistroPedido: "",
    estadoPedido: "",
    prioridadPedido: "",
    fechaEntregaEstimadaPedido: "",
    materialIdMaterial: "",
    clienteIdCliente: "",
    empleadoIdEmpleado: "",
  });

  // Si recibo un pedido para editar, convierto las fechas a formato ISO
  useEffect(() => {
    if (pedidoEditado) {
      setPedido({
        ...pedidoEditado,
        fechaRegistroPedido: pedidoEditado.fechaRegistroPedido
          ? new Date(pedidoEditado.fechaRegistroPedido).toISOString().slice(0, 16)
          : "",
        fechaEntregaEstimadaPedido: pedidoEditado.fechaEntregaEstimadaPedido
          ? new Date(pedidoEditado.fechaEntregaEstimadaPedido).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [pedidoEditado]);

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = pedido.idPedido ? "PUT" : "POST";
    const url = pedido.idPedido
      ? `http://localhost:8080/pedidos/${pedido.idPedido}`
      : "http://localhost:8080/pedidos";

    // Convertir fechas a objetos Date antes de enviar
    const pedidoEnviar = {
      ...pedido,
      fechaRegistroPedido: pedido.fechaRegistroPedido ? new Date(pedido.fechaRegistroPedido) : null,
      fechaEntregaEstimadaPedido: pedido.fechaEntregaEstimadaPedido ? new Date(pedido.fechaEntregaEstimadaPedido) : null,
    };

    try {
      const data = await fetchWithToken(url, {
        method,
        body: JSON.stringify(pedidoEnviar),
      });
      onSave(data);
      setPedido({
        fechaRegistroPedido: "",
        estadoPedido: "",
        prioridadPedido: "",
        fechaEntregaEstimadaPedido: "",
        materialIdMaterial: "",
        clienteIdCliente: "",
        empleadoIdEmpleado: "",
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
        {pedido.idPedido ? "Editar Pedido" : "Registrar Pedido"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          type="datetime-local"
          name="fechaRegistroPedido"
          value={pedido.fechaRegistroPedido}
          onChange={handleChange}
          label="Fecha Registro"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="estadoPedido"
          value={pedido.estadoPedido}
          onChange={handleChange}
          label="Estado"
          variant="outlined"
          required
        />
        <TextField
          name="prioridadPedido"
          value={pedido.prioridadPedido}
          onChange={handleChange}
          label="Prioridad"
          variant="outlined"
          required
        />
        <TextField
          type="datetime-local"
          name="fechaEntregaEstimadaPedido"
          value={pedido.fechaEntregaEstimadaPedido}
          onChange={handleChange}
          label="Fecha Entrega Estimada"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="materialIdMaterial"
          value={pedido.materialIdMaterial}
          onChange={handleChange}
          label="ID Material"
          variant="outlined"
          required
        />
        <TextField
          name="clienteIdCliente"
          value={pedido.clienteIdCliente}
          onChange={handleChange}
          label="ID Cliente"
          variant="outlined"
          required
        />
        <TextField
          name="empleadoIdEmpleado"
          value={pedido.empleadoIdEmpleado}
          onChange={handleChange}
          label="ID Empleado"
          variant="outlined"
          required
        />
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
          {pedido.idPedido ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default PedidoForm;