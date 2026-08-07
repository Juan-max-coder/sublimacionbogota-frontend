// Lista de reportes con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import ReporteForm from './ReporteForm';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

function ReporteList() {
  const [reportes, setReportes] = useState([]);
  const [reporteEditado, setReporteEditado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/reportes")
      .then(res => res.json())
      .then(data => setReportes(data));
  }, []);

  const eliminarReporte = (id) => {
    fetch(`http://localhost:8080/reportes/${id}`, { method: "DELETE" })
      .then(() => setReportes(reportes.filter(r => r.idReporte !== id)));
  };

  const guardarReporte = (reporte) => {
    if (reporteEditado) {
      setReportes(reportes.map(r => r.idReporte === reporte.idReporte ? reporte : r));
      setReporteEditado(null);
    } else {
      setReportes([...reportes, reporte]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Reportes</h2>
      <TableContainer component={Paper} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", background: "linear-gradient(135deg, #fdfbfb, #ebedee)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2c3e50" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tipo</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Usuario</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportes.map(r => (
              <TableRow key={r.idReporte} hover sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
                <TableCell>{r.tipoReporte}</TableCell>
                <TableCell>{r.fechaReporte ? new Date(r.fechaReporte).toLocaleString() : ""}</TableCell>
                <TableCell>{r.usuarioIdUsuario}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{ mr: 1, borderRadius: "8px", background: "linear-gradient(90deg, #1abc9c, #16a085)", color: "#fff", "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" } }} onClick={() => setReporteEditado(r)}>
                    Editar
                  </Button>
                  <Button variant="contained" sx={{ borderRadius: "8px", background: "linear-gradient(90deg, #e74c3c, #c0392b)", color: "#fff", "&:hover": { background: "linear-gradient(90deg, #c0392b, #e74c3c)" } }} onClick={() => eliminarReporte(r.idReporte)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Formulario para crear o editar reporte */}
      <div style={{ marginTop: "30px" }}>
        <ReporteForm reporteEditado={reporteEditado} onSave={guardarReporte} />
      </div>
    </div>
  );
}

export default ReporteList;