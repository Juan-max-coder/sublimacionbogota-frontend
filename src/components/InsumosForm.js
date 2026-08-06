// Formulario para registrar y editar insumos
import React, { useState, useEffect } from 'react';

function InsumosForm({ insumoEditado, onSave }) {
  // Estado inicial del formulario
  const [insumo, setInsumo] = useState({
    nombreInsumo: "",
    costoInsumo: "",
    stockInsumo: "",
    precioInsumo: "",
    inventarioMovimientoIdMovimiento: ""
  });

  // Si recibo un insumo para editar, cargo sus datos en el formulario
  useEffect(() => {
    if (insumoEditado) {
      setInsumo(insumoEditado);
    }
  }, [insumoEditado]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setInsumo({ ...insumo, [e.target.name]: e.target.value });
  };

  // Envío del formulario (crear o actualizar insumo)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = insumo.idInsumo ? "PUT" : "POST";
    const url = insumo.idInsumo 
      ? `http://localhost:8080/insumos/${insumo.idInsumo}` 
      : "http://localhost:8080/insumos";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(insumo)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data); // actualizo la lista
        // Reinicio el formulario
        setInsumo({
          nombreInsumo: "",
          costoInsumo: "",
          stockInsumo: "",
          precioInsumo: "",
          inventarioMovimientoIdMovimiento: ""
        });
      });
  };

  return (
    <div>
      <h2>{insumo.idInsumo ? "Editar Insumo" : "Registrar Insumo"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombreInsumo" value={insumo.nombreInsumo} onChange={handleChange} placeholder="Nombre" required />
        <input type="number" name="costoInsumo" value={insumo.costoInsumo} onChange={handleChange} placeholder="Costo" required />
        <input type="number" name="stockInsumo" value={insumo.stockInsumo} onChange={handleChange} placeholder="Stock" required />
        <input type="number" name="precioInsumo" value={insumo.precioInsumo} onChange={handleChange} placeholder="Precio" required />
        <input name="inventarioMovimientoIdMovimiento" value={insumo.inventarioMovimientoIdMovimiento} onChange={handleChange} placeholder="ID Movimiento" required />
        <button type="submit">{insumo.idInsumo ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default InsumosForm;