import React, { useState, useEffect } from 'react';

function TareaProduccionForm({ tareaEditada, onSave }) {
  const [tarea, setTarea] = useState({
    descripcionTarea: "",
    estadoTarea: "",
    avanceTarea: "",
    empleadoIdEmpleado: "",
    produccionIdProduccion: ""
  });

  useEffect(() => {
    if (tareaEditada) {
      setTarea(tareaEditada);
    }
  }, [tareaEditada]);

  const handleChange = (e) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = tarea.idTarea ? "PUT" : "POST";
    const url = tarea.idTarea 
      ? `http://localhost:8080/tareas/${tarea.idTarea}` 
      : "http://localhost:8080/tareas";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarea)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data);
        setTarea({
          descripcionTarea: "",
          estadoTarea: "",
          avanceTarea: "",
          empleadoIdEmpleado: "",
          produccionIdProduccion: ""
        });
      });
  };

  return (
    <div>
      <h2>{tarea.idTarea ? "Editar Tarea" : "Registrar Tarea"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="descripcionTarea" value={tarea.descripcionTarea} onChange={handleChange} placeholder="Descripción" required />
        <input name="estadoTarea" value={tarea.estadoTarea} onChange={handleChange} placeholder="Estado" required />
        <input type="number" name="avanceTarea" value={tarea.avanceTarea} onChange={handleChange} placeholder="Avance (%)" required />
        <input name="empleadoIdEmpleado" value={tarea.empleadoIdEmpleado} onChange={handleChange} placeholder="ID Empleado" required />
        <input name="produccionIdProduccion" value={tarea.produccionIdProduccion} onChange={handleChange} placeholder="ID Producción" required />
        <button type="submit">{tarea.idTarea ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default TareaProduccionForm;