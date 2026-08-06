// Lista de insumos con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import InsumosForm from './InsumosForm';

function InsumosList() {
  // Estado para la lista de insumos y el insumo que se edita
  const [insumos, setInsumos] = useState([]);
  const [insumoEditado, setInsumoEditado] = useState(null);

  // Cargar insumos desde el backend al iniciar
  useEffect(() => {
    fetch("http://localhost:8080/insumos")
      .then(res => res.json())
      .then(data => {
        console.log("Insumos recibidos:", data);
        setInsumos(data);
      });
  }, []);

  // Eliminar insumo por id
  const eliminarInsumo = (id) => {
    fetch(`http://localhost:8080/insumos/${id}`, { method: "DELETE" })
      .then(() => setInsumos(insumos.filter(i => i.idInsumo !== id)));
  };

  // Guardar insumo nuevo o actualizado
  const guardarInsumo = (insumo) => {
    if (insumoEditado) {
      setInsumos(insumos.map(i => i.idInsumo === insumo.idInsumo ? insumo : i));
      setInsumoEditado(null);
    } else {
      setInsumos([...insumos, insumo]);
    }
  };

  return (
    <div>
      <h2>Lista de Insumos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Costo</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>ID Movimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {insumos.map(i => (
            <tr key={i.idInsumo}>
              <td>{i.nombreInsumo}</td>
              <td>{i.costoInsumo}</td>
              <td>{i.stockInsumo}</td>
              <td>{i.precioInsumo}</td>
              <td>{i.inventarioMovimientoIdMovimiento}</td>
              <td>
                <button onClick={() => setInsumoEditado(i)}>Editar</button>
                <button onClick={() => eliminarInsumo(i.idInsumo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para crear o editar insumo */}
      <InsumosForm insumoEditado={insumoEditado} onSave={guardarInsumo} />
    </div>
  );
}

export default InsumosList;