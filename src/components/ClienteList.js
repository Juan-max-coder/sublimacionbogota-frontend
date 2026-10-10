// Lista de clientes con opciones de editar y eliminar
import React, { useEffect, useState } from "react";
import ClienteForm from "./ClienteForm";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button
} from "@mui/material";
import { fetchWithToken } from "../services/api"; // ✅ Importa la función global

function ClienteList() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditado, setClienteEditado] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'https://sublimacionbogotaframework-production.up.railway.app';

  useEffect(() => {
    fetchWithToken(`${API_URL}/clientes`)
      .then((data) => setClientes(data))
      .catch((err) => alert(err.message));
  }, [API_URL]);

  const eliminarCliente = async (id) => {
    try {
      await fetchWithToken(`${API_URL}/clientes/${id}`, { method: "DELETE" });
      setClientes(clientes.filter((c) => c.idCliente !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const guardarCliente = (cliente) => {
    if (clienteEditado) {
      setClientes(clientes.map((c) => (c.idCliente === cliente.idCliente ? cliente : c)));
      setClienteEditado(null);
    } else {
      setClientes([...clientes, cliente]);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Lista de Clientes</h2>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2c3e50" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Apellido</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Dirección</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Teléfono</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Correo</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tipo</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((c) => (
              <TableRow key={c.idCliente} hover sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" } }}>
                <TableCell>{c.nombreCliente}</TableCell>
                <TableCell>{c.apellidoCliente}</TableCell>
                <TableCell>{c.direccionCliente}</TableCell>
                <TableCell>{c.telefonoCliente}</TableCell>
                <TableCell>{c.correoCliente}</TableCell>
                <TableCell>{c.tipoCliente}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{
                      mr: 1,
                      borderRadius: "8px",
                      background: "linear-gradient(90deg, #1abc9c, #16a085)",
                      color: "#fff",
                      "&:hover": { background: "linear-gradient(90deg, #16a085, #1abc9c)" },
                    }}
                    onClick={() => setClienteEditado(c)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "8px",
                      background: "linear-gradient(90deg, #e74c3c, #c0392b)",
                      color: "#fff",
                      "&:hover": { background: "linear-gradient(90deg, #c0392b, #e74c3c)" },
                    }}
                    onClick={() => eliminarCliente(c.idCliente)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "30px" }}>
        <ClienteForm clienteEditado={clienteEditado} onSave={guardarCliente} />
      </div>
    </div>
  );
}

export default ClienteList;