// Lista de empleados con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import EmpleadoForm from './EmpleadoForm';

function EmpleadoList() {
  // Estado para la lista de empleados y el empleado que se edita
  const [empleados, setEmpleados] = useState([]);
  const [empleadoEditado, setEmpleadoEditado] = useState(null);

  // Cargar empleados desde el backend al iniciar
  useEffect(() => {
    fetch("http://localhost:8080/empleados")
      .then(res => res.json())
      .then(data => {
        console.log("Empleados recibidos:", data);
        setEmpleados(data);
      });
  }, []);

  // Eliminar empleado por id
  const eliminarEmpleado = (id) => {
    fetch(`http://localhost:8080/empleados/${id}`, { method: "DELETE" })
      .then(() => setEmpleados(empleados.filter(e => e.idEmpleado !== id)));
  };

  // Guardar empleado nuevo o actualizado
  const guardarEmpleado = (empleado) => {
    if (empleadoEditado) {
      setEmpleados(empleados.map(e => e.idEmpleado === empleado.idEmpleado ? empleado : e));
      setEmpleadoEditado(null);
    } else {
      setEmpleados([...empleados, empleado]);
    }
  };

  return (
    <div>
      <h2>Lista de Empleados</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Área</th>
            <th>Contacto</th>
            <th>ID Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map(e => (
            <tr key={e.idEmpleado}>
              <td>{e.nombreEmpleado}</td>
              <td>{e.cargoEmpleado}</td>
              <td>{e.areaEmpleado}</td>
              <td>{e.contactoEmpleado}</td>
              <td>{e.usuarioIdUsuario}</td>
              <td>
                <button onClick={() => setEmpleadoEditado(e)}>Editar</button>
                <button onClick={() => eliminarEmpleado(e.idEmpleado)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para crear o editar empleado */}
      <EmpleadoForm empleadoEditado={empleadoEditado} onSave={guardarEmpleado} />
    </div>
  );
}

export default EmpleadoList;