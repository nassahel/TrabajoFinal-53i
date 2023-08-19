import React, { useState } from "react";
import ProductoFormulario from "./productosFormulario";
import Productos from "./productos";
import "./styles/ListaDeProductos.css"

function ListaDeProductos() {

  const[producto, setProducto] = useState([])

  const agregarProductos = productos => {
    console.log(agregarProductos);
    console.log(productos);
  }

  return (
    <>
     <ProductoFormulario/> 
     <div className="lista-productos-contenedor">
      {
        producto.map((productos) =>
        <Productos
        texto= {productos.text}
        />
        )
      }
     </div>
    </>
  )
}

export default ListaDeProductos