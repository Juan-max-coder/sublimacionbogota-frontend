import React from 'react';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';
import DetallePedidoForm from './components/DetallePedidoForm';
import DetallePedidoList from './components/DetallePedidoList';
import EmpleadoList from './components/EmpleadoList';
import FacturaList from './components/FacturaList';
import InsumosList from './components/InsumosList';
import InventarioMovimientoList from './components/InventarioMovimientoList';
import MaterialList from './components/MaterialList';
import PedidoList from './components/PedidoList'; // nuevo import

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
      <EmpleadoList />

      <h2>Facturas</h2>
      <FacturaList />

      <h2>Insumos</h2>
      <InsumosList />

      <h2>Movimientos de Inventario</h2>
      <InventarioMovimientoList />

      <h2>Materiales</h2>
      <MaterialList />

      <h2>Pedidos</h2>
      <PedidoList /> {/* nuevo componente */}
    </div>
  );
}

export default App;