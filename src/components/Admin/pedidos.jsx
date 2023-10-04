import React, { useState, useEffect } from "react";
import PedidosResultado from "./pedidosResultado";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedido, setPedido] = useState({});
  const [status, setStatus] = useState("");
  const [idPedidos, setidPedidos] = useState()
  const [editPedidos, setEditPedidos] = useState(false)

  let token = localStorage.getItem('token');

  //TRAER PRODUCTOS DEL BACKEND
  const pedidosGet = async () => {

    try {
      const url = 'https://backend-rolling53i.onrender.com/api/pedidos';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-token': token,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error('No se pudo agregar el producto');
      }
      setPedidos(data.orders)
    } catch (error) {
      console.error('Error al agregar el Pedido:', error);
    }
  }

  
  useEffect(() => {
    pedidosGet();
    console.log(pedidosGet);
  }, []);

  //EDITAR PRODUCTOS DEL BACKEND
  const datosEdicion = (id) => {
    const pedidoFind = pedidos.find((pedido) => pedido._id === id);

    if (pedidoFind) {
      setidPedidos(pedidoFind)
      setEditPedidos(true)
      setStatus(pedidoFind.status)
      console.log(status);
    }
  }

  const modificarPedidos = async () => {
    try {
      const updatePedidos = {
        status: status,
      };
      console.log(idPedidos);
      console.log(status);

      const url = `https://backend-rolling53i.onrender.com/api/pedidos/${idPedidos._id}`; // Incluir el ID en la URL
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-token': token,
        },
        body: JSON.stringify(updatePedidos),
      });
      if (!response.ok) {
        throw new Error('No se pudo editar el Pedido');
      }

      console.log('Pedido editado con éxito');
      pedidosGet(); // Actualizar la lista de usuarios
      setEditPedidos(false)
    } catch (error) {
      console.error('Error al editar el Producto:', error);
    }
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editPedidos) {
      modificarPedidos()
    }

      //PARA QUE APAREZCA LOS PRODUCTOS EN EL INPUT CUANDO PONGA EDITAR
  const cargarProductos = () => {
    if (Object.keys(pedido.length > 0)) {
      setStatus(pedido.status)
    } else {
      console.log('No hay nada en el array de tarea');
    }
  }

  };

  return (
    <main className="container-fluid col-lg-11">
      <form className="m-auto  bg-white p-2 rounded" onSubmit={handleSubmit}>
        <div className="row mt-4">
          <div className=' d-flex justify-content-center flex-column align-items-center text-center'>
            <label className='ps-2 producto-texto fs-6' htmlFor="descripcion">Pedido Status</label>
            <select
              className='mt-3 input-productos col-6 col-lg-2 p-1 input-nombre rounded border border-black border-opacity-50'
              name="status"
              id="status"
              placeholder="Producto status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={"pendiente"}>Pendiente</option>
              <option value={"realizado"}>Realizado</option>
            </select>
          </div >
          <div className='col-md-12'>
            <div className='mt-2 text-center'>
              <input
                className="my-2 mb-3 btn btn-dark"
                type="submit"
                value={editPedidos ? 'Editar Pedido' : 'Agregar Pedido'}
              />
            </div>
          </div>
        </div>
      </form>

      <div className="resultado">
        <PedidosResultado
          pedidos={pedidos}
          modificarPedidos={datosEdicion}
        />
      </div>
    </main>
  );
}

export default Pedidos;
