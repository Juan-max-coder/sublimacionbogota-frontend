import React, { useEffect, useState } from 'react';
import FacturaForm from './FacturaForm';

function FacturaList() {
  const [facturas, setFacturas] = useState([]);
  const [facturaEditada, setFacturaEditada] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/facturas")
      .then(res => res.json())
      .then(data => {
        console.log("Facturas recibidas:", data);
        setFacturas(data);
      });
  }, []);

  const eliminarFactura = (id) => {
    fetch(`http://localhost:8080/facturas/${id}`, { method: "DELETE" })
      .then(() => setFacturas(facturas.filter(f => f.idFactura !== id)));
  };

  const guardarFactura = (factura) => {
    if (facturaEditada) {
      setFacturas(facturas.map(f => f.idFactura === factura.idFactura ? factura : f));
      setFacturaEditada(null);
    } else {
      setFacturas([...facturas, factura]);
    }
  };

  return (
    <div>
      <h2>Lista de Facturas</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Estado</th>
            <th>Fecha Exportación</th>
            <th>Fecha Confirmación</th>
            <th>ID Pedido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map(f => (
            <tr key={f.idFactura}>
              <td>{f.estadoFactura}</td>
              <td>{f.fechaExportacionFactura ? new Date(f.fechaExportacionFactura).toLocaleString() : ""}</td>
              <td>{f.fechaConfirmacionFactura ? new Date(f.fechaConfirmacionFactura).toLocaleString() : ""}</td>
              <td>{f.pedidoIdPedido}</td>
              <td>
                <button onClick={() => setFacturaEditada(f)}>Editar</button>
                <button onClick={() => eliminarFactura(f.idFactura)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FacturaForm facturaEditada={facturaEditada} onSave={guardarFactura} />
    </div>
  );
}

export default FacturaList;