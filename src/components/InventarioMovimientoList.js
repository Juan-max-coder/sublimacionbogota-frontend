// Lista de movimientos de inventario con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import InventarioMovimientoForm from './InventarioMovimientoForm';

function InventarioMovimientoList() {
  // Estado para la lista de movimientos y el movimiento que se edita
  const [movimientos, setMovimientos] = useState([]);
  const [movimientoEditado, setMovimientoEditado] = useState(null);

  // Cargar movimientos desde el backend al iniciar
  useEffect(() => {
    fetch("http://localhost:8080/movimientos")
      .then(res => res.json())
      .then(data => {
        console.log("Movimientos recibidos:", data);
        setMovimientos(data);
      });
  }, []);

  // Eliminar movimiento por id
  const eliminarMovimiento = (id) => {
    fetch(`http://localhost:8080/movimientos/${id}`, { method: "DELETE" })
      .then(() => setMovimientos(movimientos.filter(m => m.idMovimiento !== id)));
  };

  // Guardar movimiento nuevo o actualizado
  const guardarMovimiento = (movimiento) => {
    if (movimientoEditado) {
      setMovimientos(movimientos.map(m => m.idMovimiento === movimiento.idMovimiento ? movimiento : m));
      setMovimientoEditado(null);
    } else {
      setMovimientos([...movimientos, movimiento]);
    }
  };

  return (
    <div>
      <h2>Lista de Movimientos de Inventario</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Detalles del Material</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map(m => (
            <tr key={m.idMovimiento}>
              <td>{m.tipoMovimiento}</td>
              <td>{m.cantidadDelMovimiento}</td>
              <td>{m.detallesDelMaterialEnMovimiento}</td>
              <td>
                <button onClick={() => setMovimientoEditado(m)}>Editar</button>
                <button onClick={() => eliminarMovimiento(m.idMovimiento)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para crear o editar movimiento */}
      <InventarioMovimientoForm movimientoEditado={movimientoEditado} onSave={guardarMovimiento} />
    </div>
  );
}

export default InventarioMovimientoList;