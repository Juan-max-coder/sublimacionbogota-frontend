// Formulario para registrar y editar materiales
import React, { useState, useEffect } from 'react';

function MaterialForm({ materialEditado, onSave }) {
  // Estado inicial del formulario
  const [material, setMaterial] = useState({
    nombreMaterial: "",
    tipoMaterial: "",
    colorMaterial: "",
    cantidadDisponibleMaterial: "",
    clienteIdCliente: ""
  });

  // Si recibo un material para editar, cargo sus datos en el formulario
  useEffect(() => {
    if (materialEditado) {
      setMaterial(materialEditado);
    }
  }, [materialEditado]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

  // Envío del formulario (crear o actualizar material)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = material.idMaterial ? "PUT" : "POST";
    const url = material.idMaterial 
      ? `http://localhost:8080/materiales/${material.idMaterial}` 
      : "http://localhost:8080/materiales";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(material)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data); // actualizo la lista
        // Reinicio el formulario
        setMaterial({
          nombreMaterial: "",
          tipoMaterial: "",
          colorMaterial: "",
          cantidadDisponibleMaterial: "",
          clienteIdCliente: ""
        });
      });
  };

  return (
    <div>
      <h2>{material.idMaterial ? "Editar Material" : "Registrar Material"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombreMaterial" value={material.nombreMaterial} onChange={handleChange} placeholder="Nombre" required />
        <input name="tipoMaterial" value={material.tipoMaterial} onChange={handleChange} placeholder="Tipo" required />
        <input name="colorMaterial" value={material.colorMaterial} onChange={handleChange} placeholder="Color" required />
        <input type="number" name="cantidadDisponibleMaterial" value={material.cantidadDisponibleMaterial} onChange={handleChange} placeholder="Cantidad Disponible" required />
        <input name="clienteIdCliente" value={material.clienteIdCliente} onChange={handleChange} placeholder="ID Cliente" required />
        <button type="submit">{material.idMaterial ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default MaterialForm;