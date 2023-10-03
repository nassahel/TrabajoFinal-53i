import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { CartContext } from "../../components/CartContext/CartContext";

const Orders = () => {
  const [cart, setCart] = useContext(CartContext);
  const [summaryText, setSummaryText] = useState(false)
  const [tokenUser, setTokenUser] = useState(localStorage.getItem('token'));
  const [costoTotal, setCostoTotal] = useState(0)

  const handleConfirmPurchase = async () => {
    try {
      //const tokenData = JSON.parse(atob(tokenUser.split('.')[1]));
      //const tokenUserId = tokenData.uid;

      if(cart.length === 0) {
        return alert('Debes seleccionar al menos 1 producto')
      }

      const newOrder = {
        order: cart,
        totalCost: costoTotal
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
    } catch (error) {
      if(!tokenUser) {
        setSummaryText(true)

        setTimeout(function() {
          setSummaryText(false)
        }, 3000);
      }
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
  };

  const totalCost = () => {
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    return totalPrice;
  }

  useEffect(() => {
    const calculatedTotal = totalCost();
    setCostoTotal(calculatedTotal);
  }, [cart]);

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
        <div className="mt-3 d-flex flex-column justify-content-center text-white">
          <h5>El costo total seria:</h5>
          <p className="fw-semibold">${costoTotal}</p>
        </div>
        <div className="mt-2 d-flex flex-row justify-content-center align-items-center">
          <button style={{ backgroundColor: "#2C4B45" }} className='btn botonConfirmar fw-bold me-3 text-light' onClick={handleConfirmPurchase}>Confirmar compra</button>
          <button className='btn btn-danger fw-bold' onClick={handleEmptyCart}>Vaciar Carrito</button>
        </div>
        {
          summaryText &&
          <div className="mt-3 mb-0">
            <p className="text-danger fs-6 fw-semibold fst-italic mb-0">Debes estar registrado</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Orders;
