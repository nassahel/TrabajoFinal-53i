import React, { useState } from "react";
import ProductoFormulario from "./productosFormulario";
import Productos from "./productos";
import "./styles/ListaDeProductos.css"

function ListaDeProductos() {

  const[producto, setProducto] = useState([])

  const agregarProductos = productos => {
    if (productos.text.trim()) {
      productos.text = productos.text.trim()
      const productoActualizado = [producto, ...producto]
    }
  }

  return (
    <>
     <ProductoFormulario onSubmit={agregarProductos}/> 
     <div className="lista-productos-contenedor">
      {
        producto.map((productos) =>
        <Productos
        text= {productos.text}
        />
        )
      }
     </div>
    </>
  )
}

export default ListaDeProductos