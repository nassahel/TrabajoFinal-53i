import React, { useState,useEffect} from "react";
import Main from "../../components/main/Main";
import { useLocation, useNavigate } from "react-router-dom";


function Orders() {
  const location = useLocation()
  const navigate = useNavigate()
  const [item, setItem] = useState(null) 
  const [error, setError] = useState(null)
  useEffect( ()=> {
    console.log(location.state)
    setItem(location.state)
  },[])
  
  const confirmar = async () => {
    setError(null) // Sacar los errores para empezar de 0
    const fecha = Date.now() // Obtiene la fecha del momento del pedido

    const usuario = JSON.parse(localStorage.getItem("registros")) // Checkea que estas logueado y guarda el usuario
    if (!usuario){
      setError("No estas registrado papilo")
      return
    }

    const data = { // Armar el objeto para enviar al API
      user: usuario,
      date: fecha,
      order: item,
      status: "pendiente",
      totalCost: Number(item.price)
    }
    console.log(data)
    try { // Hacer la peticion POST con un try/catch para manejar errores
      const peticion = await fetch('https://backend-rolling53i.onrender.com/api/pedidos',
        {
          method: "POST",
          headers:{
            'Content-Type':'aplication/json',
            // Authentication: 'Bearer {token}'
          },
          body: JSON.stringify(data),
        }
      );
      if (!peticion) {
        throw new Error("Error prueba mas tarde")
      }
      navigate("/")
    } catch (e) {
      setError(e)
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
     
        {item ? (
          <div className="col col-lg-3 w-100">
              <div className="card text-center border-4 border-dark p-3 h-100 w-100 my-3" key={item.id}>
                  <img className='card-img-top w-50 mx-auto' src={item.image} alt={item.name} />
                  <div className="card-body d-flex flex-column justify-content-end">
                    <h5 className="card-title" >{item.name}</h5>
                      <h5 className='card-title'>{item.category} </h5>
                      <h5 className='card-title'>${item.price}</h5>
                      <button className='btn btn-outline-warning rounded-0 fw-bold' onClick={confirmar}>Confirmar compra</button>
                  </div>
              </div>
          </div>
        ) : <p className="text-danger">No has seleccionado nada</p>}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}

export default Orders;