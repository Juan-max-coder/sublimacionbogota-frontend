import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material"; // usamos Box de Material UI
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

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
import UsuarioList from "./components/UsuarioList";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar fijo a la izquierda */}
        <Sidebar />

        {/* Contenido principal con degradé y burbujas */}
        <Box
          sx={{
            flex: 1,
            padding: "20px",
            minHeight: "100vh",
            background: "linear-gradient(135deg, #69ffb2, #56effa, #447df8)", // 🎨 degradé diagonal cálido
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* burbuja arriba izquierda */}
          <Box
            sx={{
              position: "absolute",
              top: "-60px",
              left: "-60px",
              width: "200px",
              height: "200px",
              background: "rgba(255,255,255,0.25)",
              borderRadius: "50%",
              filter: "blur(40px)",
            }}
          />
          {/* burbuja abajo derecha */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-60px",
              right: "-60px",
              width: "200px",
              height: "200px",
              background: "rgba(255,255,255,0.25)",
              borderRadius: "50%",
              filter: "blur(40px)",
            }}
          />

          {/* Rutas */}
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
            <Route path="/usuarios" element={<UsuarioList />} />
          </Routes>
        </Box>
      </div>
    </Router>
  );
}

export default App;