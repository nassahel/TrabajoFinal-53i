import React, { useState, useEffect } from "react";
import Main from "../../components/main/Main";
import { AiFillPlusCircle, AiFillMinusCircle, AiFillDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";


function Orders() {
  const location = useLocation()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)
  const [prodCount, setProdCount] = useState(0);
  const [emptyCart, setEmptyCart] = useState(false);

  const aumentar = () => {
    if (prodCount >= 0) {
      setProdCount(prodCount + 1)
    }
  }

  const disminuir = () => {
    if (prodCount >= 1) {
      setProdCount(prodCount - 1)
    }
  }


  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("orders"))
    setOrder(order) 
    
  }, [])

  const clear = () => {
    localStorage.removeItem("orders")
    setOrder([]); // Vaciar el carrito
    setEmptyCart(true); // Establecer el carrito como vacío
      window.dispatchEvent( new Event('storage') )
   }

  const confirmar = async () => {
    setError(null) // Sacar los errores para empezar de 0
    const fecha = new Date(Date.now()) // Obtiene la fecha del momento del pedido

    const token = localStorage.getItem("token")
    if (!token) {
      setError("No estas registrado papilo")
      return
    }
    console.log(token)

    const total = order.reduce((total, actual) => total + actual.price, 0)
    const data = { // Armar el objeto para enviar al API
      user: token,
      date: fecha,
      order: order,
      status: false,
      totalCost: total
    }
    console.log(data)
    try { // Hacer la peticion POST con un try/catch para manejar errores
      const peticion = await fetch('https://backend-rolling53i.onrender.com/api/pedidos',
        {
          method: "POST",
          headers: {
            "Content-Type": "aplication/json;  charset=UTF-8",
            "Authentication": `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      console.log(peticion)
      if (!peticion.ok) {
        throw new Error("Error prueba mas tarde")
      }
      localStorage.removeItem("orders")
      setEmptyCart(true); // Establecer el carrito como vacío
      window.dispatchEvent(new Event('storage'))
      navigate("/")
    } catch (e) {
      setError(e.message)

    }
  }

   

  


  return (
    <div className="container-fluid main-cont d-flex flex-column align-items-center ">
      <div className="container bg-success text-light p-2 text-center"><h2>Tu pedido</h2></div>

      <div className="container text-center py-4 bg-dark bg-opacity-75 my-4 rounded ">
        {error && <p className="text-danger">{error}</p>}
        {emptyCart ? (
          <p className="text-danger">El carrito está vacío</p>
        ) : order ? order.map((item, index) => (
          <div className="row bg-light col-10 border border-success rounded m-3 py-3 mx-auto" key={item.id || index}>
            <div className="col text-start"><img className='img-fluid w-50 rounded' src={item.image} alt={item.name} /></div>
            <div className="col my-auto"><h5 className="card-title" >{item.name}</h5></div>
            <div className="col my-auto"><h5 className='card-title'>${item.price}</h5></div>
            <div className="col my-auto">
              <h5>Cantidad</h5>
              <div>
                <AiFillMinusCircle onClick={disminuir} size='25' color='green' />
                <input className="w-25 border mx-2 text-center" type="numbre" name="poductMount" id="proMount" value={prodCount} />
                <AiFillPlusCircle onClick={aumentar} size='25' color='green' />
              </div>
            </div>
            <div className="col my-auto text-end pe-4"> <AiFillDelete size={25} color='brown' /></div>

          </div>
        ) ) : <p className="text-danger">No has seleccionado nada</p>}
<div>
  <button className='btn botonConfirmar btn-md mt-4 fw-bold me-3' onClick={confirmar}>Confirmar compra</button>
        <button className='btn botonConfirmar btn-sm mt-4 fw-bold' onClick={clear}>Vaciar Carrito</button>
</div>
        
      </div>
    </div>
  );
}

export default Orders