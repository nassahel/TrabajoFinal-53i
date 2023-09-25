import React, { useState,useEffect} from "react";
import Main from "../../components/main/Main";
import { useLocation } from "react-router-dom";


function Carrito() {
  const location = useLocation()
  const [item, setItem] = useState(null) 
  const [error, setError] = useState(null)
  useEffect( ()=> setItem(location.state),[])
  const confirmar = async() => {
    setError(null)
    const fecha = new Date.now()
   const usuario = localStorage.getItem("registros")
   if (!usuario){
    setError("No estas registrado papilo")
    return
  } 

    const data = {
      usuario ,
      fecha ,
      menu: item,
      estado: "pendiente" ,
    }
    const peticion = await fetch('https://fakestoreapi.com/products',
    {
      method:"POST",
      headers:{
        'Content-Type':'aplication/json'
      },
      body:JSON.stringify(data),
    }
    );
    const prom = await peticion.json();
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
          <div className="col col-lg-3">
              <div className="card text-center border-4 border-dark p-3 h-100" key={item.id}>
                  <img className='card-img-top w-50 mx-auto' src={item.image} alt={item.title} />
                  <div className="card-body d-flex flex-column justify-content-end">
                      <h5 className='card-title'>{item.title} </h5>
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

export default Carrito;
