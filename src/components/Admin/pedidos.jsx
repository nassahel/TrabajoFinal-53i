import React, { useState } from "react";
import PedidosResultado from "./pedidosResultado";

const Pedidos = () => {
  const pedidosBd = [
    {
      user: 'Nassahel Elias',
      id: 1,
      status: false // Cambiado a booleano (Pendiente)
    },
    {
      user: 'Pia Lopez',
      id: 2,
      status: true // Cambiado a booleano (Realizado)
    },
    {
      user: 'Luis Chehin',
      id: 3,
      status: false // Cambiado a booleano (Pendiente)
    },
  ];

  const [pedidos, setPedidos] = useState(pedidosBd);
  const [pedido, setPedido] = useState({});
  const [status, setStatus] = useState(false); // Inicializado con false (Pendiente)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos (ya que status es un booleano, no necesitas esta validación)

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
    setStatus(false);
  };

  return (
    <main>
      <form className="my-auto bg-white p-2 rounded" onSubmit={handleSubmit}>
        <div className="row mt-4">
          <div className=' d-flex justify-content-center flex-column align-items-center text-center'>
            <label className='ps-2 producto-texto fs-6' htmlFor="descripcion">Pedido Status</label>
            <select
              className='mt-3 input-productos w-25 p-1 input-nombre rounded border border-black border-opacity-50'
              name="status"
              id="status"
              placeholder="Producto status"
              value={status} // El valor de status debe ser false (Pendiente) o true (Realizado)
              onChange={(e) => setStatus(e.target.value === 'true')} // Actualizar el estado del campo de estado
            >
              <option value={false}>Pendiente</option>
              <option value={true}>Realizado</option>
            </select>
          </div >
          <div className='col-md-12'>
            <div className='mt-2 text-center'>
              <input
                className="my-2 mb-3 btn btn-dark"
                type="submit"
                value={pedido.id ? 'Editar Pedido' : 'Agregar Pedido'}
              />
            </div>
          </div>
        </div>
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
