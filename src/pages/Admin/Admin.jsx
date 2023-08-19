import React from "react"
import './admin.css'
import Productos from "../../components/Admin/productos"
import ProductoFormulario from "../../components/Admin/productosFormulario"

function Admin() {
  return (
    <div className="productos-lista-principal">
      <h1 className="titulo-productos">Productos</h1>
      <Productos texto='Pizza a la napolitana'/>
      <ProductoFormulario/>
    </div>
  )
}

export default Admin