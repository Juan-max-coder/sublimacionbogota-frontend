// Lista de usuarios con opciones de editar y eliminar
import React, { useEffect, useState } from 'react';
import UsuarioForm from './UsuarioForm';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []);

  const eliminarUsuario = (id) => {
    fetch(`http://localhost:8080/usuarios/${id}`, { method: "DELETE" })
      .then(() => setUsuarios(usuarios.filter(u => u.idUsuario !== id)));
  };

  const guardarUsuario = (usuario) => {
    if (usuarioEditado) {
      setUsuarios(usuarios.map(u => u.idUsuario === usuario.idUsuario ? usuario : u));
      setUsuarioEditado(null);
    } else {
      setUsuarios([...usuarios, usuario]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Usuarios</h2>
      <TableContainer component={Paper} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", background: "linear-gradient(135deg, #fdfbfb, #ebedee)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2c3e50" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Apellido</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Correo</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Rol</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map(u => (
              <TableRow key={u.idUsuario} hover sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
                <TableCell>{u.nombreUsuario}</TableCell>
                <TableCell>{u.apellidoUsuario}</TableCell>
                <TableCell>{u.correoUsuario}</TableCell>
                <TableCell>{u.rolUsuario}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{ mr: 1, borderRadius: "8px", background: "linear-gradient(90deg, #1abc9c, #16a085)", color: "#fff", "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" } }} onClick={() => setUsuarioEditado(u)}>
                    Editar
                  </Button>
                  <Button variant="contained" sx={{ borderRadius: "8px", background: "linear-gradient(90deg, #e74c3c, #c0392b)", color: "#fff", "&:hover": { background: "linear-gradient(90deg, #c0392b, #e74c3c)" } }} onClick={() => eliminarUsuario(u.idUsuario)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Formulario para crear o editar usuario */}
      <div style={{ marginTop: "30px" }}>
        <UsuarioForm usuarioEditado={usuarioEditado} onSave={guardarUsuario} />
      </div>
    </div>
  );
}

export default UsuarioList;