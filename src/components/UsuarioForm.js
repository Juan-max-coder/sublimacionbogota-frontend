import React, { useState, useEffect } from 'react';

function UsuarioForm({ usuarioEditado, onSave }) {
  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    apellidoUsuario: "",
    correoUsuario: "",
    contrasenaUsuario: "",
    rolUsuario: ""
  });

  useEffect(() => {
    if (usuarioEditado) {
      setUsuario(usuarioEditado);
    }
  }, [usuarioEditado]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = usuario.idUsuario ? "PUT" : "POST";
    const url = usuario.idUsuario 
      ? `http://localhost:8080/usuarios/${usuario.idUsuario}` 
      : "http://localhost:8080/usuarios";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data);
        setUsuario({
          nombreUsuario: "",
          apellidoUsuario: "",
          correoUsuario: "",
          contrasenaUsuario: "",
          rolUsuario: ""
        });
      });
  };

  return (
    <div>
      <h2>{usuario.idUsuario ? "Editar Usuario" : "Registrar Usuario"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombreUsuario" value={usuario.nombreUsuario} onChange={handleChange} placeholder="Nombre" required />
        <input name="apellidoUsuario" value={usuario.apellidoUsuario} onChange={handleChange} placeholder="Apellido" required />
        <input type="email" name="correoUsuario" value={usuario.correoUsuario} onChange={handleChange} placeholder="Correo" required />
        <input type="password" name="contrasenaUsuario" value={usuario.contrasenaUsuario} onChange={handleChange} placeholder="Contraseña" required />
        <input name="rolUsuario" value={usuario.rolUsuario} onChange={handleChange} placeholder="Rol" required />
        <button type="submit">{usuario.idUsuario ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default UsuarioForm;