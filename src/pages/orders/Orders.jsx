import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { CartContext } from "../../components/CartContext/CartContext";

const Orders = () => {
  const [cart, setCart] = useContext(CartContext);
  const [tokenUser, setTokenUser] = useState(localStorage.getItem('token'));

  const handleConfirmPurchase = async () => {
    try {
      const tokenData = JSON.parse(atob(tokenUser.split('.')[1]));
      //const tokenUserId = tokenData.uid;

      const newOrder = {
        order: cart,
        totalCost: 50
      };

      const url = `https://backend-rolling53i.onrender.com/api/pedidos`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'x-token': tokenUser
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el pedido');
      }

      alert('Pedido enviado con exito! 🎉')
      limpiarCarrito();
      console.log('Pedido enviado con éxito');

    } catch (error) {
      console.error('Error al enviar el pedido:', error);
    }
  };

  const eliminarProducto = (id, nombre) => {
    const carritoEliminar = confirm(`¿Seguro que quieres eliminar ${nombre} de tu orden?`);

    if (carritoEliminar) {
      const updatedItems = cart.filter(item => item.id !== id);
      setCart(updatedItems);
    }
  };

  const handleEmptyCart = () => {
    const carritoLimpiar = confirm("¿Estas seguro de querer limpiar el carrito?")

    if (carritoLimpiar) {
      limpiarCarrito();
    }

  };

  const limpiarCarrito = () => {
    setCart([])
  }

  return (
    <div className="container-fluid main-cont d-flex flex-column align-items-center">
      <div className="container bg-success text-light p-2 text-center">
        <h2>Tu pedido</h2>
      </div>
      <div className="container text-center py-4 bg-dark bg-opacity-75 my-4 rounded">
        {cart ? cart.map((item, index) => (
          <div className="row bg-light col-10 border border-success rounded m-3 py-3 mx-auto" key={item.id}>
            <div className="col text-start"><img className='img-fluid w-50 rounded' src={item.image} alt={item.name} /></div>
            <div className="col my-auto"><h5 className="card-title">{item.name}</h5></div>
            <div className="col my-auto"><h5 className='card-title'>${item.price}</h5></div>
            <div className="col my-auto"><h5 className='card-title'>Unidades: {item.quantity}</h5></div>
            <div className="col my-auto text-end pe-4"> <AiFillDelete role="button" size={25} color='brown' onClick={() => eliminarProducto(item.id, item.name)} /></div>
          </div>
        )) :
          <div className="container text-center py-4 bg-dark bg-opacity-75 my-4 rounded">
            <p >No hay nada</p>
          </div>
        }
        <div>
          <button style={{ backgroundColor: "#2C4B45" }} className='btn botonConfirmar mt-4 fw-bold me-3 text-light' onClick={handleConfirmPurchase}>Confirmar compra</button>
          <button className='btn btn-danger mt-4 fw-bold' onClick={handleEmptyCart}>Vaciar Carrito</button>
        </div>
      </div>
    </div>
  );
}

export default Orders;
