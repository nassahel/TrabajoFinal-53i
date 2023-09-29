import React, { useState } from "react";
import PedidosResultado from "./pedidosResultado";

const Pedidos = () => {
  const pedidosBd = [
    {
      user: 'Nassahel Elias',
      id: 1,
      status: 'Pendiente'
    },
    {
      user: 'Pia Lopez',
      id: 2,
      status: 'Realizado'
    },
    {
      user: 'Luis Chehin',
      id: 3,
      status: 'Pendiente'
    },
  ];

  const [pedidos, setPedidos] = useState(pedidosBd);
  const [pedido, setPedido] = useState({});
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!status) {
      console.log('El campo de estado debe estar completo');
      return;
    }

    // Buscar el índice del pedido a editar
    const pedidoIndex = pedidos.findIndex((p) => p.id === pedido.id);

    if (pedidoIndex !== -1) {
      // Clonar el array de pedidos y actualizar el estado del pedido específico
      const updatedPedidos = [...pedidos];
      updatedPedidos[pedidoIndex].status = status;

      // Actualizar el estado de los pedidos
      setPedidos(updatedPedidos);

      // Limpiar el pedido seleccionado
      setPedido({});
    } else {
      console.log('Pedido no encontrado');
    }

    // Limpiar el campo de estado
    setStatus('');
  };

  return (
    <main>
      <form className="producto-pedidos " onSubmit={handleSubmit}>
        <div className='mt-3'>
          <label className='ps-2 producto-texto fs-6' htmlFor="descripcion">Pedido Status</label>
          <select
            className='mt-3 input-productos w-50 p-1 input-nombre rounded border border-black border-opacity-50'
            name="status"
            id="status"
            placeholder="Producto status"
            value={status}
            onChange={(e) => setStatus(e.target.value)} // Actualizar el estado del campo de estado
          >
            <option>Pendiente</option>
            <option>Realizado</option>
          </select>
        </div>
        <input
          className="mt-3 mb-0 btn btn-dark"
          type="submit"
          value={pedido.id ? 'Editar Pedido' : 'Agregar Pedido'}
        />
      </form>

      <div className="resultado">
        <PedidosResultado
          pedidos={pedidos}
          setPedido={setPedido}
        />
      </div>
    </main>
  );
}

export default Pedidos;

