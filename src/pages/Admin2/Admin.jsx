import React from 'react'
import Productos from '../../components/Admin/productos'
import './admin.css'


function Admin() {
  return (
    <div className='contenedor-productos'>
      <div className='productos-lista-principal'>
        <h1 className='titulo-productos fs-2'>Mis Productos</h1>
        <Productos/>
      </div>
    </div>
  )
}

export default Admin