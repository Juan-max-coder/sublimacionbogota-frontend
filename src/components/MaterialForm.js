import React, { useState, useEffect } from 'react';

function MaterialForm({ materialEditado, onSave }) {
  const [material, setMaterial] = useState({
    nombreMaterial: "",
    tipoMaterial: "",
    colorMaterial: "",
    cantidadDisponibleMaterial: "",
    clienteIdCliente: ""
  });

  useEffect(() => {
    if (materialEditado) {
      setMaterial(materialEditado);
    }
  }, [materialEditado]);

  const handleChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

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
        onSave(data);
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