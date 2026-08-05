import React, { useState, useEffect } from 'react';

function InventarioMovimientoForm({ movimientoEditado, onSave }) {
  const [movimiento, setMovimiento] = useState({
    tipoMovimiento: "",
    cantidadDelMovimiento: "",
    detallesDelMaterialEnMovimiento: ""
  });

  useEffect(() => {
    if (movimientoEditado) {
      setMovimiento(movimientoEditado);
    }
  }, [movimientoEditado]);

  const handleChange = (e) => {
    setMovimiento({ ...movimiento, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = movimiento.idMovimiento ? "PUT" : "POST";
    const url = movimiento.idMovimiento 
      ? `http://localhost:8080/movimientos/${movimiento.idMovimiento}` 
      : "http://localhost:8080/movimientos";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movimiento)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data);
        setMovimiento({
          tipoMovimiento: "",
          cantidadDelMovimiento: "",
          detallesDelMaterialEnMovimiento: ""
        });
      });
  };

  return (
    <div>
      <h2>{movimiento.idMovimiento ? "Editar Movimiento" : "Registrar Movimiento"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="tipoMovimiento" value={movimiento.tipoMovimiento} onChange={handleChange} placeholder="Tipo de Movimiento" required />
        <input type="number" name="cantidadDelMovimiento" value={movimiento.cantidadDelMovimiento} onChange={handleChange} placeholder="Cantidad" required />
        <input name="detallesDelMaterialEnMovimiento" value={movimiento.detallesDelMaterialEnMovimiento} onChange={handleChange} placeholder="Detalles del Material" required />
        <button type="submit">{movimiento.idMovimiento ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default InventarioMovimientoForm;