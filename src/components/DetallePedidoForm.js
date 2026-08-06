// Formulario para registrar y editar detalles de pedido
import React, { useState, useEffect } from 'react';

function DetallePedidoForm({ detalleEditado, onSave }) {
  // Estado inicial del formulario
  const [detalle, setDetalle] = useState({
    cantidadMaterial: "",
    precioUnitarioMaterial: "",
    costoManoDeObra: "",
    subtotalPedido: "",
    pedidoIdPedido: "",
    materialIdMaterial: "",
    insumosIdInsumo: ""
  });

  // Si recibo un detalle para editar, cargo sus datos en el formulario
  useEffect(() => {
    if (detalleEditado) {
      setDetalle(detalleEditado);
    }
  }, [detalleEditado]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setDetalle({ ...detalle, [e.target.name]: e.target.value });
  };

  // Envío del formulario (crear o actualizar detalle)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = detalle.idDetalle ? "PUT" : "POST";
    const url = detalle.idDetalle 
      ? `http://localhost:8080/detalles/${detalle.idDetalle}` 
      : "http://localhost:8080/detalles";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(detalle)
    })
    .then(res => res.json())
    .then(data => {
      onSave(data); // actualizo la lista
      // Reinicio el formulario
      setDetalle({
        cantidadMaterial: "",
        precioUnitarioMaterial: "",
        costoManoDeObra: "",
        subtotalPedido: "",
        pedidoIdPedido: "",
        materialIdMaterial: "",
        insumosIdInsumo: ""
      });
    });
  };

  return (
    <div>
      <h2>{detalle.idDetalle ? "Editar Detalle" : "Registrar Detalle"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="cantidadMaterial" value={detalle.cantidadMaterial} onChange={handleChange} placeholder="Cantidad Material" />
        <input name="precioUnitarioMaterial" value={detalle.precioUnitarioMaterial} onChange={handleChange} placeholder="Precio Unitario" />
        <input name="costoManoDeObra" value={detalle.costoManoDeObra} onChange={handleChange} placeholder="Costo Mano de Obra" />
        <input name="subtotalPedido" value={detalle.subtotalPedido} onChange={handleChange} placeholder="Subtotal Pedido" />
        <input name="pedidoIdPedido" value={detalle.pedidoIdPedido} onChange={handleChange} placeholder="ID Pedido" />
        <input name="materialIdMaterial" value={detalle.materialIdMaterial} onChange={handleChange} placeholder="ID Material" />
        <input name="insumosIdInsumo" value={detalle.insumosIdInsumo} onChange={handleChange} placeholder="ID Insumo" />
        <button type="submit">{detalle.idDetalle ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default DetallePedidoForm;