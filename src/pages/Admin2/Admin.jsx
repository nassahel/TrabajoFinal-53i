import React from 'react'
import Productos from '../../components/Admin/productos'
import './admin.css'
import Usuarios from '../../components/Admin/usuarios'

function Admin() {
  return (
    <div className='contenedor-admin'>
      <div className='contenedor-lista'>
        <h1 className='titulo fs-2'>Mis Productos</h1>
        <Productos />
      </div>
      <div className='contenedor-lista'>
        <h1 className='titulo fs-2'>Usuarios</h1>
        <Usuarios />
      </div>
    </div>
  )
}

export default Admin;