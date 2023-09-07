import React, { useEffect, useState } from "react";
import './styles/allProductos.css';
import { AiOutlineCloseCircle } from "react-icons/ai"; //Paquete de iconos

function AllProductos() {

  const [productos, setProductos] = useState([])

  const productList = async () => {
    const data = await fetch('https://fakestoreapi.com/products')
    const products = await data.json()
    setProductos(products)

  }

  useEffect(() => {
    productList()
  }, []) // Para que se renderice una sola vez

  return (
    <div className='contenedor-productos'>
      {productos.map((props) => (
        <div className='card-products'>
          <div className='contenedor-texto'>
            <p className='titulo'>{props.title}</p>
            <p className='precio'>${props.price}</p>
          </div>
          <div className="producto-iconos-contenedor"/*  onClick={eliminarProducto(id)} */>
            <AiOutlineCloseCircle className="producto-icono" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllProductos 