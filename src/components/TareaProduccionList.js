import React, { useEffect, useState } from 'react';
import TareaProduccionForm from './TareaProduccionForm';

function TareaProduccionList() {
  const [tareas, setTareas] = useState([]);
  const [tareaEditada, setTareaEditada] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/tareas")
      .then(res => res.json())
      .then(data => {
        console.log("Tareas recibidas:", data);
        setTareas(data);
      });
  }, []);

  const eliminarTarea = (id) => {
    fetch(`http://localhost:8080/tareas/${id}`, { method: "DELETE" })
      .then(() => setTareas(tareas.filter(t => t.idTarea !== id)));
  };

  const guardarTarea = (tarea) => {
    if (tareaEditada) {
      setTareas(tareas.map(t => t.idTarea === tarea.idTarea ? tarea : t));
      setTareaEditada(null);
    } else {
      setTareas([...tareas, tarea]);
    }
  };

  return (
    <div>
      <h2>Lista de Tareas de Producción</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Avance (%)</th>
            <th>ID Empleado</th>
            <th>ID Producción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map(t => (
            <tr key={t.idTarea}>
              <td>{t.descripcionTarea}</td>
              <td>{t.estadoTarea}</td>
              <td>{t.avanceTarea}</td>
              <td>{t.empleadoIdEmpleado}</td>
              <td>{t.produccionIdProduccion}</td>
              <td>
                <button onClick={() => setTareaEditada(t)}>Editar</button>
                <button onClick={() => eliminarTarea(t.idTarea)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TareaProduccionForm tareaEditada={tareaEditada} onSave={guardarTarea} />
    </div>
  );
}

export default TareaProduccionList;