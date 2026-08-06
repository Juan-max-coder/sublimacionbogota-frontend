// Lista de pedidos con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import PedidoForm from './PedidoForm';

function PedidoList() {
  // Estado para la lista de pedidos y el pedido que se edita
  const [pedidos, setPedidos] = useState([]);
  const [pedidoEditado, setPedidoEditado] = useState(null);

  // Cargar pedidos desde el backend al iniciar
  useEffect(() => {
    fetch("http://localhost:8080/pedidos")
      .then(res => res.json())
      .then(data => {
        console.log("Pedidos recibidos:", data);
        setPedidos(data);
      });
  }, []);

  // Eliminar pedido por id
  const eliminarPedido = (id) => {
    fetch(`http://localhost:8080/pedidos/${id}`, { method: "DELETE" })
      .then(() => setPedidos(pedidos.filter(p => p.idPedido !== id)));
  };

  // Guardar pedido nuevo o actualizado
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
      <h2>Lista de Pedidos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Fecha Registro</th>
            <th>Estado</th>
            <th>Prioridad</th>
            <th>Fecha Entrega Estimada</th>
            <th>ID Material</th>
            <th>ID Cliente</th>
            <th>ID Empleado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.idPedido}>
              <td>{p.fechaRegistroPedido ? new Date(p.fechaRegistroPedido).toLocaleString() : ""}</td>
              <td>{p.estadoPedido}</td>
              <td>{p.prioridadPedido}</td>
              <td>{p.fechaEntregaEstimadaPedido ? new Date(p.fechaEntregaEstimadaPedido).toLocaleString() : ""}</td>
              <td>{p.materialIdMaterial}</td>
              <td>{p.clienteIdCliente}</td>
              <td>{p.empleadoIdEmpleado}</td>
              <td>
                <button onClick={() => setPedidoEditado(p)}>Editar</button>
                <button onClick={() => eliminarPedido(p.idPedido)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para crear o editar pedido */}
      <PedidoForm pedidoEditado={pedidoEditado} onSave={guardarPedido} />
    </div>
  );
}

export default PedidoList;