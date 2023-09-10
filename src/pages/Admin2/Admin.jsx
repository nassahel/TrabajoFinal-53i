import React from 'react'
import Productos from '../../components/Admin/productos'
import './admin.css'
//import ListaDeProductos from '../../components/Admin/listaDeProductos'
import AllProductos from '../../components/Admin/allProductos'


function Admin() {
  return (
    <div className='contenedor-productos'>
      <div className='productos-lista-principal'>
        <h1 className='titulo-productos'>Mis Productos</h1>
        <Productos/>
      </div>
    </div>
  )
}

export default Admin