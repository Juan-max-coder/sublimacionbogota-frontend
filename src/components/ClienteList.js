import React, { useEffect, useState } from 'react';
import ClienteForm from './ClienteForm';

function ClienteList() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditado, setClienteEditado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/clientes")
      .then(res => res.json())
      .then(data => setClientes(data));
  }, []);

  const eliminarCliente = (id) => {
    fetch(`http://localhost:8080/clientes/${id}`, { method: "DELETE" })
      .then(() => setClientes(clientes.filter(c => c.idCliente !== id)));
  };

  const guardarCliente = (cliente) => {
    if (clienteEditado) {
      setClientes(clientes.map(c => c.idCliente === cliente.idCliente ? cliente : c));
      setClienteEditado(null);
    } else {
      setClientes([...clientes, cliente]);
    }
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.idCliente}>
              <td>{c.nombreCliente}</td>
              <td>{c.apellidoCliente}</td>
              <td>{c.direccionCliente}</td>
              <td>{c.telefonoCliente}</td>
              <td>{c.correoCliente}</td>
              <td>{c.tipoCliente}</td>
              <td>
                <button onClick={() => setClienteEditado(c)}>Editar</button>
                <button onClick={() => eliminarCliente(c.idCliente)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ClienteForm clienteEditado={clienteEditado} onSave={guardarCliente} />
    </div>
  );
}

export default ClienteList;