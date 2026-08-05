import React, { useEffect, useState } from 'react';
import MaterialForm from './MaterialForm';

function MaterialList() {
  const [materiales, setMateriales] = useState([]);
  const [materialEditado, setMaterialEditado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/materiales")
      .then(res => res.json())
      .then(data => {
        console.log("Materiales recibidos:", data);
        setMateriales(data);
      });
  }, []);

  const eliminarMaterial = (id) => {
    fetch(`http://localhost:8080/materiales/${id}`, { method: "DELETE" })
      .then(() => setMateriales(materiales.filter(m => m.idMaterial !== id)));
  };

  const guardarMaterial = (material) => {
    if (materialEditado) {
      setMateriales(materiales.map(m => m.idMaterial === material.idMaterial ? material : m));
      setMaterialEditado(null);
    } else {
      setMateriales([...materiales, material]);
    }
  };

  return (
    <div>
      <h2>Lista de Materiales</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Color</th>
            <th>Cantidad Disponible</th>
            <th>ID Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materiales.map(m => (
            <tr key={m.idMaterial}>
              <td>{m.nombreMaterial}</td>
              <td>{m.tipoMaterial}</td>
              <td>{m.colorMaterial}</td>
              <td>{m.cantidadDisponibleMaterial}</td>
              <td>{m.clienteIdCliente}</td>
              <td>
                <button onClick={() => setMaterialEditado(m)}>Editar</button>
                <button onClick={() => eliminarMaterial(m.idMaterial)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <MaterialForm materialEditado={materialEditado} onSave={guardarMaterial} />
    </div>
  );
}

export default MaterialList;