// Lista de materiales con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import MaterialForm from './MaterialForm';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";

function MaterialList() {
  // Estado para la lista de materiales y el material que se edita
  const [materiales, setMateriales] = useState([]);
  const [materialEditado, setMaterialEditado] = useState(null);

  // Cargar materiales desde el backend al iniciar
  useEffect(() => {
    fetch("http://localhost:8080/materiales")
      .then(res => res.json())
      .then(data => {
        console.log("Materiales recibidos:", data);
        setMateriales(data);
      });
  }, []);

  // Eliminar material por id
  const eliminarMaterial = (id) => {
    fetch(`http://localhost:8080/materiales/${id}`, { method: "DELETE" })
      .then(() => setMateriales(materiales.filter(m => m.idMaterial !== id)));
  };

  // Guardar material nuevo o actualizado
  const guardarMaterial = (material) => {
    if (materialEditado) {
      setMateriales(materiales.map(m => m.idMaterial === material.idMaterial ? material : m));
      setMaterialEditado(null);
    } else {
      setMateriales([...materiales, material]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Materiales</h2>

      {/* Tabla estilizada con Material UI */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          background: "linear-gradient(135deg, #fdfbfb, #ebedee)"
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2c3e50" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tipo</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Color</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Cantidad Disponible</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID Cliente</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materiales.map(m => (
              <TableRow
                key={m.idMaterial}
                hover
                sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}
              >
                <TableCell>{m.nombreMaterial}</TableCell>
                <TableCell>{m.tipoMaterial}</TableCell>
                <TableCell>{m.colorMaterial}</TableCell>
                <TableCell>{m.cantidadDisponibleMaterial}</TableCell>
                <TableCell>{m.clienteIdCliente}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      mr: 1,
                      borderRadius: "8px",
                      background: "linear-gradient(90deg, #1abc9c, #16a085)",
                      color: "#fff",
                      "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" }
                    }}
                    onClick={() => setMaterialEditado(m)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "8px",
                      background: "linear-gradient(90deg, #e74c3c, #c0392b)",
                      color: "#fff",
                      "&:hover": { background: "linear-gradient(90deg, #c0392b, #e74c3c)" }
                    }}
                    onClick={() => eliminarMaterial(m.idMaterial)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Formulario para crear o editar material */}
      <div style={{ marginTop: "30px" }}>
        <MaterialForm materialEditado={materialEditado} onSave={guardarMaterial} />
      </div>
    </div>
  );
}

export default MaterialList;