import React, { useState, useEffect } from 'react';

function EmpleadoForm({ empleadoEditado, onSave }) {
  const [empleado, setEmpleado] = useState({
    nombreEmpleado: "",
    cargoEmpleado: "",
    areaEmpleado: "",
    contactoEmpleado: "",
    usuarioIdUsuario: ""
  });

  useEffect(() => {
    if (empleadoEditado) {
      setEmpleado(empleadoEditado);
    }
  }, [empleadoEditado]);

  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = empleado.idEmpleado ? "PUT" : "POST";
    const url = empleado.idEmpleado 
      ? `http://localhost:8080/empleados/${empleado.idEmpleado}` 
      : "http://localhost:8080/empleados";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empleado)
    })
    .then(res => res.json())
    .then(data => {
      onSave(data);
      setEmpleado({
        nombreEmpleado: "",
        cargoEmpleado: "",
        areaEmpleado: "",
        contactoEmpleado: "",
        usuarioIdUsuario: ""
      });
    });
  };

  return (
    <div>
      <h2>{empleado.idEmpleado ? "Editar Empleado" : "Registrar Empleado"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombreEmpleado" value={empleado.nombreEmpleado} onChange={handleChange} placeholder="Nombre" required />
        <input name="cargoEmpleado" value={empleado.cargoEmpleado} onChange={handleChange} placeholder="Cargo" required />
        <input name="areaEmpleado" value={empleado.areaEmpleado} onChange={handleChange} placeholder="Área" required />
        <input name="contactoEmpleado" value={empleado.contactoEmpleado} onChange={handleChange} placeholder="Contacto" required />
        <input name="usuarioIdUsuario" value={empleado.usuarioIdUsuario} onChange={handleChange} placeholder="ID Usuario" required />
        <button type="submit">{empleado.idEmpleado ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default EmpleadoForm;