import React, { useState,useEffect} from "react";
import Main from "../../components/main/Main";
import { useLocation, useNavigate } from "react-router-dom";


function Orders() {
  const location = useLocation()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null) 
  const [error, setError] = useState(null)
  useEffect( ()=> {
    const order = JSON.parse(localStorage.getItem("orders"))
    setOrder(order)
  },[])
  
  const confirmar = async () => {
    setError(null) // Sacar los errores para empezar de 0
    const fecha = new Date(Date.now()) // Obtiene la fecha del momento del pedido
0
    const token = localStorage.getItem("token")
    console.log(token)
    if (!token){
      setError("No estas registrado papilo")
      return
    }
   
    const total = order.reduce((total, actual) => total + actual.price, 0)
    console.log(total)
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
          headers:{
            "Content-Type":"aplication/json;  charset=UTF-8",
           // "x-token": `${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      console.log(peticion)
      if (!peticion.ok) {
        throw new Error("Error prueba mas tarde")
      }
      localStorage.removeItem("orders")
      window.dispatchEvent( new Event('storage') )
      navigate("/")
    } catch (e) {
      setError(e.message)
      
    }
  }
 




  return (
    <div className="container-fluid main-cont d-flex flex-column align-items-center">
      <img
        className="col-11 col-lg-6 pt-4 my-4"
        src="src\assets\img\Titulo_proyecto_final.jpg"
        alt=""
      />
      <div>
      <button className='btn btn-outline-warning rounded-0 fw-bold' onClick={confirmar}>Confirmar compra</button>
      {error && <p className="text-danger">{error}</p>} 
        {order ? order.map( (item) => (
          <div className="col col-lg-3 w-100" key={item.id}>
              <div className="card text-center border-4 border-dark p-3 h-100 w-100 my-3" >
                  <img className='card-img-top w-50 mx-auto' src={item.image} alt={item.name} />
                  <div className="card-body d-flex flex-column justify-content-end">
                    <h5 className="card-title" >{item.name}</h5>
                      <h5 className='card-title'>{item.category} </h5>
                      <h5 className='card-title'>${item.price}</h5>
                  </div>
              </div>
          </div>
        )) : <p className="text-danger">No has seleccionado nada</p>}
        
      </div>
    </div>
  );
}

export default Orders;