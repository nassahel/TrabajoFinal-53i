import React from "react"
import './admin.css'
import ListaDeProductos from "../../components/Admin/listaDeProductos"

function Admin() {
  return (
    <div className="productos-lista-principal">
      <h1 className="titulo-productos">Productos</h1>
      <ListaDeProductos/>
    </div>
  )
}

export default Admin