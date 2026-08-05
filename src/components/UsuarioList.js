import React, { useEffect, useState } from 'react';
import UsuarioForm from './UsuarioForm';

function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/usuarios")
      .then(res => res.json())
      .then(data => {
        console.log("Usuarios recibidos:", data);
        setUsuarios(data);
      });
  }, []);

  const eliminarUsuario = (id) => {
    fetch(`http://localhost:8080/usuarios/${id}`, { method: "DELETE" })
      .then(() => setUsuarios(usuarios.filter(u => u.idUsuario !== id)));
  };

  const guardarUsuario = (usuario) => {
    if (usuarioEditado) {
      setUsuarios(usuarios.map(u => u.idUsuario === usuario.idUsuario ? usuario : u));
      setUsuarioEditado(null);
    } else {
      setUsuarios([...usuarios, usuario]);
    }
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.idUsuario}>
              <td>{u.nombreUsuario}</td>
              <td>{u.apellidoUsuario}</td>
              <td>{u.correoUsuario}</td>
              <td>{u.rolUsuario}</td>
              <td>
                <button onClick={() => setUsuarioEditado(u)}>Editar</button>
                <button onClick={() => eliminarUsuario(u.idUsuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UsuarioForm usuarioEditado={usuarioEditado} onSave={guardarUsuario} />
    </div>
  );
}

export default UsuarioList;