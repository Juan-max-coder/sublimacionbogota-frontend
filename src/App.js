import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Login from "./components/Login";

// Importa los módulos
import ClienteList from "./components/ClienteList";
import DetallePedidoList from "./components/DetallePedidoList";
import EmpleadoList from "./components/EmpleadoList";
import FacturaList from "./components/FacturaList";
import InsumosList from "./components/InsumosList";
import InventarioMovimientoList from "./components/InventarioMovimientoList";
import MaterialList from "./components/MaterialList";
import PedidoList from "./components/PedidoList";
import ProduccionList from "./components/ProduccionList";
import ReporteList from "./components/ReporteList";
import TareaProduccionList from "./components/TareaProduccionList";
import CuentaList from "./components/CuentaList"; // antes UsuarioList

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleLogin = (rol) => {
    setIsAuthenticated(true);
    setUserRole(rol);
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div style={{ display: "flex" }}>
          <Sidebar role={userRole} />
          <Box
            sx={{
              flex: 1,
              padding: "20px",
              minHeight: "100vh",
              background: "linear-gradient(135deg, #69ffb2, #56effa, #447df8)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clientes" element={<ClienteList />} />
              <Route path="/detalles" element={<DetallePedidoList />} />
              <Route path="/empleados" element={<EmpleadoList />} />
              <Route path="/facturas" element={<FacturaList />} />
              <Route path="/insumos" element={<InsumosList />} />
              <Route path="/movimientos" element={<InventarioMovimientoList />} />
              <Route path="/materiales" element={<MaterialList />} />
              <Route path="/pedidos" element={<PedidoList />} />
              <Route path="/producciones" element={<ProduccionList />} />
              <Route path="/reportes" element={<ReporteList />} />
              <Route path="/tareas" element={<TareaProduccionList />} />
              <Route path="/cuentas" element={<CuentaList />} />
            </Routes>
          </Box>
        </div>
      )}
    </Router>
  );
}

export default App;