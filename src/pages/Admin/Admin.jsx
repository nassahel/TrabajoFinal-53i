import React from "react"
import './admin.css'
import Productos from "../../components/Admin/productos"

function Admin() {
  return (
    <div className="productos-lista-principal">
      <h1 className="titulo-productos">Productos</h1>
      <Productos/>
    </div>
  )
}

export default Admin