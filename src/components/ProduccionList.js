import React, { useEffect, useState } from 'react';
import ProduccionForm from './ProduccionForm';

function ProduccionList() {
  const [producciones, setProducciones] = useState([]);
  const [produccionEditada, setProduccionEditada] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/producciones")
      .then(res => res.json())
      .then(data => {
        console.log("Producciones recibidas:", data);
        setProducciones(data);
      });
  }, []);

  const eliminarProduccion = (id) => {
    fetch(`http://localhost:8080/producciones/${id}`, { method: "DELETE" })
      .then(() => setProducciones(producciones.filter(p => p.idProduccion !== id)));
  };

  const guardarProduccion = (produccion) => {
    if (produccionEditada) {
      setProducciones(producciones.map(p => p.idProduccion === produccion.idProduccion ? produccion : p));
      setProduccionEditada(null);
    } else {
      setProducciones([...producciones, produccion]);
    }
  };

  return (
    <div>
      <h2>Lista de Producciones</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Estado</th>
            <th>ID Pedido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {producciones.map(p => (
            <tr key={p.idProduccion}>
              <td>{p.fechaInicioProduccion ? new Date(p.fechaInicioProduccion).toLocaleString() : ""}</td>
              <td>{p.fechaFinProduccion ? new Date(p.fechaFinProduccion).toLocaleString() : ""}</td>
              <td>{p.estadoProduccion}</td>
              <td>{p.pedidoIdPedido}</td>
              <td>
                <button onClick={() => setProduccionEditada(p)}>Editar</button>
                <button onClick={() => eliminarProduccion(p.idProduccion)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProduccionForm produccionEditada={produccionEditada} onSave={guardarProduccion} />
    </div>
  );
}

export default ProduccionList;