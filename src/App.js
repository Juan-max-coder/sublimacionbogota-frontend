import React from 'react';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';
import DetallePedidoForm from './components/DetallePedidoForm';
import DetallePedidoList from './components/DetallePedidoList';
import EmpleadoForm from './components/EmpleadoForm';
import EmpleadoList from './components/EmpleadoList';
import FacturaForm from './components/FacturaForm';
import FacturaList from './components/FacturaList';
import InsumosForm from './components/InsumosForm';
import InsumosList from './components/InsumosList';
import InventarioMovimientoForm from './components/InventarioMovimientoForm';
import InventarioMovimientoList from './components/InventarioMovimientoList';
import MaterialForm from './components/MaterialForm';
import MaterialList from './components/MaterialList';
import PedidoForm from './components/PedidoForm';
import PedidoList from './components/PedidoList';
import ProduccionForm from './components/ProduccionForm';
import ProduccionList from './components/ProduccionList';
import ReporteForm from './components/ReporteForm';
import ReporteList from './components/ReporteList';
import TareaProduccionForm from './components/TareaProduccionForm';
import TareaProduccionList from './components/TareaProduccionList';
import UsuarioForm from './components/UsuarioForm';
import UsuarioList from './components/UsuarioList';

function App() {
  return (
    <div className="App">
      <h1>Sublimación Bogotá - Frontend</h1>
      
      <h2>Clientes</h2>
      <ClienteForm />
      <ClienteList />

      <h2>Detalles de Pedido</h2>
      <DetallePedidoForm />
      <DetallePedidoList />

      <h2>Empleados</h2>
      <EmpleadoForm />
      <EmpleadoList />

      <h2>Facturas</h2>
      <FacturaForm />
      <FacturaList />

      <h2>Insumos</h2>
      <InsumosForm />
      <InsumosList />

      <h2>Movimientos de Inventario</h2>
      <InventarioMovimientoForm />
      <InventarioMovimientoList />

      <h2>Materiales</h2>
      <MaterialForm />
      <MaterialList />

      <h2>Pedidos</h2>
      <PedidoForm />
      <PedidoList />

      <h2>Producciones</h2>
      <ProduccionForm />
      <ProduccionList />

      <h2>Reportes</h2>
      <ReporteForm />
      <ReporteList />

      <h2>Tareas de Producción</h2>
      <TareaProduccionForm />
      <TareaProduccionList />

      <h2>Usuarios</h2>
      <UsuarioForm />
      <UsuarioList />
    </div>
  );
}

export default App;