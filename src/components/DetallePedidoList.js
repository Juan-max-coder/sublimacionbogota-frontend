// Lista de detalles de pedido con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import DetallePedidoForm from './DetallePedidoForm';

function DetallePedidoList() {
  // Estado para la lista de detalles y el detalle que se edita
  const [detalles, setDetalles] = useState([]);
  const [detalleEditado, setDetalleEditado] = useState(null);

  // Cargar detalles desde el backend al iniciar
  useEffect(() => {
    fetch("http://localhost:8080/detalles")
      .then(res => res.json())
      .then(data => setDetalles(data));
  }, []);

  // Eliminar detalle por id
  const eliminarDetalle = (id) => {
    fetch(`http://localhost:8080/detalles/${id}`, { method: "DELETE" })
      .then(() => setDetalles(detalles.filter(d => d.idDetalle !== id)));
  };

  // Guardar detalle nuevo o actualizado
  const guardarDetalle = (detalle) => {
    if (detalleEditado) {
      setDetalles(detalles.map(d => d.idDetalle === detalle.idDetalle ? detalle : d));
      setDetalleEditado(null);
    } else {
      setDetalles([...detalles, detalle]);
    }
  };

  return (
    <div>
      <h2>Lista de Detalles de Pedido</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Costo Mano de Obra</th>
            <th>Subtotal</th>
            <th>ID Pedido</th>
            <th>ID Material</th>
            <th>ID Insumo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map(d => (
            <tr key={d.idDetalle}>
              <td>{d.cantidadMaterial}</td>
              <td>{d.precioUnitarioMaterial}</td>
              <td>{d.costoManoDeObra}</td>
              <td>{d.subtotalPedido}</td>
              <td>{d.pedidoIdPedido}</td>
              <td>{d.materialIdMaterial}</td>
              <td>{d.insumosIdInsumo}</td>
              <td>
                <button onClick={() => setDetalleEditado(d)}>Editar</button>
                <button onClick={() => eliminarDetalle(d.idDetalle)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para crear o editar detalle */}
      <DetallePedidoForm detalleEditado={detalleEditado} onSave={guardarDetalle} />
    </div>
  );
}

export default DetallePedidoList;