// Lista de reportes con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import ReporteForm from './ReporteForm';

function ReporteList() {
  // Estado para la lista de reportes y el reporte que se edita
  const [reportes, setReportes] = useState([]);
  const [reporteEditado, setReporteEditado] = useState(null);

  // Cargar reportes desde el backend al iniciar
  useEffect(() => {
    fetch("http://localhost:8080/reportes")
      .then(res => res.json())
      .then(data => {
        console.log("Reportes recibidos:", data);
        setReportes(data);
      });
  }, []);

  // Eliminar reporte por id
  const eliminarReporte = (id) => {
    fetch(`http://localhost:8080/reportes/${id}`, { method: "DELETE" })
      .then(() => setReportes(reportes.filter(r => r.idReporte !== id)));
  };

  // Guardar reporte nuevo o actualizado
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
      <h2>Lista de Reportes</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>ID Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map(r => (
            <tr key={r.idReporte}>
              <td>{r.tipoReporte}</td>
              <td>{r.fechaReporte ? new Date(r.fechaReporte).toLocaleString() : ""}</td>
              <td>{r.usuarioIdUsuario}</td>
              <td>
                <button onClick={() => setReporteEditado(r)}>Editar</button>
                <button onClick={() => eliminarReporte(r.idReporte)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para crear o editar reporte */}
      <ReporteForm reporteEditado={reporteEditado} onSave={guardarReporte} />
    </div>
  );
}

export default ReporteList;