// Formulario para registrar y editar reportes
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Box } from "@mui/material";

function ReporteForm({ reporteEditado, onSave }) {
  const [reporte, setReporte] = useState({
    tipoReporte: "",
    fechaReporte: "",
    usuarioIdUsuario: ""
  });

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

  const handleChange = (e) => {
    setReporte({ ...reporte, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = reporte.idReporte ? "PUT" : "POST";
    const url = reporte.idReporte 
      ? `http://localhost:8080/reportes/${reporte.idReporte}` 
      : "http://localhost:8080/reportes";

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
        onSave(data);
        setReporte({
          tipoReporte: "",
          fechaReporte: "",
          usuarioIdUsuario: ""
        });
      });
  };

  return (
    <Paper sx={{ p: 3, borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", background: "linear-gradient(135deg, #ffffff, #f0f0f0)" }}>
      <h2 style={{ marginBottom: "20px" }}>
        {reporte.idReporte ? "Editar Reporte" : "Registrar Reporte"}
      </h2>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField name="tipoReporte" value={reporte.tipoReporte} onChange={handleChange} label="Tipo de Reporte" required />
        <TextField type="datetime-local" name="fechaReporte" value={reporte.fechaReporte} onChange={handleChange} label="Fecha" InputLabelProps={{ shrink: true }} />
        <TextField name="usuarioIdUsuario" value={reporte.usuarioIdUsuario} onChange={handleChange} label="ID Usuario" required />
        <Button type="submit" variant="contained" sx={{ mt: 2, borderRadius: "8px", background: "linear-gradient(90deg, #1abc9c, #16a085)", color: "#fff", fontWeight: "bold", "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" } }}>
          {reporte.idReporte ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Paper>
  );
}

export default ReporteForm;