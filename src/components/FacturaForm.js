// Formulario para registrar y editar facturas
import React, { useState, useEffect } from 'react';

function FacturaForm({ facturaEditada, onSave }) {
  // Estado inicial del formulario
  const [factura, setFactura] = useState({
    estadoFactura: "",
    fechaExportacionFactura: "",
    fechaConfirmacionFactura: "",
    pedidoIdPedido: ""
  });

  // Si recibo una factura para editar, convierto las fechas a formato ISO
  useEffect(() => {
    if (facturaEditada) {
      setFactura({
        ...facturaEditada,
        fechaExportacionFactura: facturaEditada.fechaExportacionFactura
          ? new Date(facturaEditada.fechaExportacionFactura).toISOString().slice(0,16)
          : "",
        fechaConfirmacionFactura: facturaEditada.fechaConfirmacionFactura
          ? new Date(facturaEditada.fechaConfirmacionFactura).toISOString().slice(0,16)
          : ""
      });
    }
  }, [facturaEditada]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setFactura({ ...factura, [e.target.name]: e.target.value });
  };

  // Envío del formulario (crear o actualizar factura)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = factura.idFactura ? "PUT" : "POST";
    const url = factura.idFactura 
      ? `http://localhost:8080/facturas/${factura.idFactura}` 
      : "http://localhost:8080/facturas";

    // Convertir fechas a objetos Date antes de enviar
    const facturaEnviar = {
      ...factura,
      fechaExportacionFactura: factura.fechaExportacionFactura ? new Date(factura.fechaExportacionFactura) : null,
      fechaConfirmacionFactura: factura.fechaConfirmacionFactura ? new Date(factura.fechaConfirmacionFactura) : null
    };

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(facturaEnviar)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data); // actualizo la lista
        // Reinicio el formulario
        setFactura({
          estadoFactura: "",
          fechaExportacionFactura: "",
          fechaConfirmacionFactura: "",
          pedidoIdPedido: ""
        });
      });
  };

  return (
    <div>
      <h2>{factura.idFactura ? "Editar Factura" : "Registrar Factura"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="estadoFactura" value={factura.estadoFactura} onChange={handleChange} placeholder="Estado" required />
        <input type="datetime-local" name="fechaExportacionFactura" value={factura.fechaExportacionFactura} onChange={handleChange} />
        <input type="datetime-local" name="fechaConfirmacionFactura" value={factura.fechaConfirmacionFactura} onChange={handleChange} />
        <input name="pedidoIdPedido" value={factura.pedidoIdPedido} onChange={handleChange} placeholder="ID Pedido" required />
        <button type="submit">{factura.idFactura ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default FacturaForm;