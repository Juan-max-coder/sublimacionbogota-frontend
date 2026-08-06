// Formulario para registrar y editar pedidos
import React, { useState, useEffect } from 'react';

function PedidoForm({ pedidoEditado, onSave }) {
  // Estado inicial del formulario
  const [pedido, setPedido] = useState({
    fechaRegistroPedido: "",
    estadoPedido: "",
    prioridadPedido: "",
    fechaEntregaEstimadaPedido: "",
    materialIdMaterial: "",
    clienteIdCliente: "",
    empleadoIdEmpleado: ""
  });

  // Si recibo un pedido para editar, convierto las fechas a formato ISO
  useEffect(() => {
    if (pedidoEditado) {
      setPedido({
        ...pedidoEditado,
        fechaRegistroPedido: pedidoEditado.fechaRegistroPedido
          ? new Date(pedidoEditado.fechaRegistroPedido).toISOString().slice(0,16)
          : "",
        fechaEntregaEstimadaPedido: pedidoEditado.fechaEntregaEstimadaPedido
          ? new Date(pedidoEditado.fechaEntregaEstimadaPedido).toISOString().slice(0,16)
          : ""
      });
    }
  }, [pedidoEditado]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  // Envío del formulario (crear o actualizar pedido)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = pedido.idPedido ? "PUT" : "POST";
    const url = pedido.idPedido 
      ? `http://localhost:8080/pedidos/${pedido.idPedido}` 
      : "http://localhost:8080/pedidos";

    // Convertir fechas a objetos Date antes de enviar
    const pedidoEnviar = {
      ...pedido,
      fechaRegistroPedido: pedido.fechaRegistroPedido ? new Date(pedido.fechaRegistroPedido) : null,
      fechaEntregaEstimadaPedido: pedido.fechaEntregaEstimadaPedido ? new Date(pedido.fechaEntregaEstimadaPedido) : null
    };

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedidoEnviar)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data); // actualizo la lista
        // Reinicio el formulario
        setPedido({
          fechaRegistroPedido: "",
          estadoPedido: "",
          prioridadPedido: "",
          fechaEntregaEstimadaPedido: "",
          materialIdMaterial: "",
          clienteIdCliente: "",
          empleadoIdEmpleado: ""
        });
      });
  };

  return (
    <div>
      <h2>{pedido.idPedido ? "Editar Pedido" : "Registrar Pedido"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="datetime-local" name="fechaRegistroPedido" value={pedido.fechaRegistroPedido} onChange={handleChange} />
        <input name="estadoPedido" value={pedido.estadoPedido} onChange={handleChange} placeholder="Estado" required />
        <input name="prioridadPedido" value={pedido.prioridadPedido} onChange={handleChange} placeholder="Prioridad" required />
        <input type="datetime-local" name="fechaEntregaEstimadaPedido" value={pedido.fechaEntregaEstimadaPedido} onChange={handleChange} />
        <input name="materialIdMaterial" value={pedido.materialIdMaterial} onChange={handleChange} placeholder="ID Material" required />
        <input name="clienteIdCliente" value={pedido.clienteIdCliente} onChange={handleChange} placeholder="ID Cliente" required />
        <input name="empleadoIdEmpleado" value={pedido.empleadoIdEmpleado} onChange={handleChange} placeholder="ID Empleado" required />
        <button type="submit">{pedido.idPedido ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default PedidoForm;