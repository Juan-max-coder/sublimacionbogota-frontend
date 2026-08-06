// Formulario para registrar y editar reportes
import React, { useState, useEffect } from 'react';

function ReporteForm({ reporteEditado, onSave }) {
  // Estado inicial del formulario
  const [reporte, setReporte] = useState({
    tipoReporte: "",
    fechaReporte: "",
    usuarioIdUsuario: ""
  });

  // Si recibo un reporte para editar, convierto la fecha a formato ISO
  useEffect(() => {
    if (reporteEditado) {
      setReporte({
        ...reporteEditado,
        fechaReporte: reporteEditado.fechaReporte
          ? new Date(reporteEditado.fechaReporte).toISOString().slice(0,16)
          : ""
      });
    }
  }, [reporteEditado]);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setReporte({ ...reporte, [e.target.name]: e.target.value });
  };

  // Envío del formulario (crear o actualizar reporte)
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = reporte.idReporte ? "PUT" : "POST";
    const url = reporte.idReporte 
      ? `http://localhost:8080/reportes/${reporte.idReporte}` 
      : "http://localhost:8080/reportes";

    // Convertir fecha a objeto Date antes de enviar
    const reporteEnviar = {
      ...reporte,
      fechaReporte: reporte.fechaReporte ? new Date(reporte.fechaReporte) : null
    };

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reporteEnviar)
    })
      .then(res => res.json())
      .then(data => {
        onSave(data); // actualizo la lista
        // Reinicio el formulario
        setReporte({
          tipoReporte: "",
          fechaReporte: "",
          usuarioIdUsuario: ""
        });
      });
  };

  return (
    <div>
      <h2>{reporte.idReporte ? "Editar Reporte" : "Registrar Reporte"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="tipoReporte" value={reporte.tipoReporte} onChange={handleChange} placeholder="Tipo de Reporte" required />
        <input type="datetime-local" name="fechaReporte" value={reporte.fechaReporte} onChange={handleChange} />
        <input name="usuarioIdUsuario" value={reporte.usuarioIdUsuario} onChange={handleChange} placeholder="ID Usuario" required />
        <button type="submit">{reporte.idReporte ? "Actualizar" : "Guardar"}</button>
      </form>
    </div>
  );
}

export default ReporteForm;