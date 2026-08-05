import React, { useState, useEffect } from 'react';

function ClienteForm({ clienteEditado, onSave }) {
  const [cliente, setCliente] = useState({
    nombreCliente: "",
    apellidoCliente: "",
    direccionCliente: "",
    telefonoCliente: "",
    correoCliente: "",
    tipoCliente: ""
  });

  useEffect(() => {
    if (clienteEditado) {
      setCliente(clienteEditado);
    }
  }, [clienteEditado]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = cliente.idCliente ? "PUT" : "POST";
    const url = cliente.idCliente 
      ? `http://localhost:8080/clientes/${cliente.idCliente}` 
      : "http://localhost:8080/clientes";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    })
    .then(res => res.json())
    .then(data => {
      onSave(data);
      setCliente({
        nombreCliente: "",
        apellidoCliente: "",
        direccionCliente: "",
        telefonoCliente: "",
        correoCliente: "",
        tipoCliente: ""
      });
    });
  };

  return (
    <div>
      <h2>{cliente.idCliente ? "Editar Cliente" : "Registrar Cliente"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombreCliente" value={cliente.nombreCliente} onChange={handleChange} placeholder="Nombre" />
        <input name="apellidoCliente" value={cliente.apellidoCliente} onChange={handleChange} placeholder="Apellido" />
        <input name="direccionCliente" value={cliente.direccionCliente} onChange={handleChange} placeholder="Dirección" />
        <input name="telefonoCliente" value={cliente.telefonoCliente} onChange={handleChange} placeholder="Teléfono" />
        <input name="correoCliente" value={cliente.correoCliente} onChange={handleChange} placeholder="Correo" />
        <input name="tipoCliente" value={cliente.tipoCliente} onChange={handleChange} placeholder="Tipo Cliente" />
        <button type="submit">{cliente.idCliente ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default ClienteForm;