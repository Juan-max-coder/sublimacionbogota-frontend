// Lista de producciones con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import ProduccionForm from './ProduccionForm';

function ProduccionList() {
  // Estado para la lista de producciones y la producción que se edita
  const [producciones, setProducciones] = useState([]);
  const [produccionEditada, setProduccionEditada] = useState(null);

  // Cargar producciones desde el backend al iniciar
  useEffect(() => {
    fetch("http://localhost:8080/producciones")
      .then(res => res.json())
      .then(data => {
        console.log("Producciones recibidas:", data);
        setProducciones(data);
      });
  }, []);

  // Eliminar producción por id
  const eliminarProduccion = (id) => {
    fetch(`http://localhost:8080/producciones/${id}`, { method: "DELETE" })
      .then(() => setProducciones(producciones.filter(p => p.idProduccion !== id)));
  };

  // Guardar producción nueva o actualizada
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

      {/* Formulario para crear o editar producción */}
      <ProduccionForm produccionEditada={produccionEditada} onSave={guardarProduccion} />
    </div>
  );
}

export default ProduccionList;