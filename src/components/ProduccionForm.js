import React, { useState, useEffect } from 'react';

function ProduccionForm({ produccionEditada, onSave }) {
  const [produccion, setProduccion] = useState({
    fechaInicioProduccion: "",
    fechaFinProduccion: "",
    estadoProduccion: "",
    pedidoIdPedido: ""
  });

  useEffect(() => {
    if (produccionEditada) {
      setProduccion({
        ...produccionEditada,
        fechaInicioProduccion: produccionEditada.fechaInicioProduccion
          ? new Date(produccionEditada.fechaInicioProduccion).toISOString().slice(0,16)
          : "",
        fechaFinProduccion: produccionEditada.fechaFinProduccion
          ? new Date(produccionEditada.fechaFinProduccion).toISOString().slice(0,16)
          : ""
      });
    }
  }, [produccionEditada]);

  const handleChange = (e) => {
    setProduccion({ ...produccion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = produccion.idProduccion ? "PUT" : "POST";
    const url = produccion.idProduccion 
      ? `http://localhost:8080/producciones/${produccion.idProduccion}` 
      : "http://localhost:8080/producciones";

    const produccionEnviar = {
      ...produccion,
      fechaInicioProduccion: produccion.fechaInicioProduccion ? new Date(produccion.fechaInicioProduccion) : null,
      fechaFinProduccion: produccion.fechaFinProduccion ? new Date(produccion.fechaFinProduccion) : null
    };

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produccionEnviar)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data);
        setProduccion({
          fechaInicioProduccion: "",
          fechaFinProduccion: "",
          estadoProduccion: "",
          pedidoIdPedido: ""
        });
      });
  };

  return (
    <div>
      <h2>{produccion.idProduccion ? "Editar Producción" : "Registrar Producción"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="datetime-local" name="fechaInicioProduccion" value={produccion.fechaInicioProduccion} onChange={handleChange} />
        <input type="datetime-local" name="fechaFinProduccion" value={produccion.fechaFinProduccion} onChange={handleChange} />
        <input name="estadoProduccion" value={produccion.estadoProduccion} onChange={handleChange} placeholder="Estado" required />
        <input name="pedidoIdPedido" value={produccion.pedidoIdPedido} onChange={handleChange} placeholder="ID Pedido" required />
        <button type="submit">{produccion.idProduccion ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default ProduccionForm;