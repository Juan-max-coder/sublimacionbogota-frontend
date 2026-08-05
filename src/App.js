import React from 'react';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';
import DetallePedidoForm from './components/DetallePedidoForm';
import DetallePedidoList from './components/DetallePedidoList';

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
    </div>
  );
}

export default App;