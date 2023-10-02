import React from 'react'
import Productos from '../../components/Admin/productos'
import './admin.css'
import Usuarios from '../../components/Admin/usuarios'
import Pedidos from '../../components/Admin/pedidos'

function Admin() {
  return (
    <div className='contenedor-completo bg-opacity-75 d-flex flex-column justify-content-center align-items-center'>
      <div className='contenedor-productos-usuarios'>
        <div className='contenedor-lista col-12'>
          <h1 className='titulo fs-2 text-white text-center'>Mis Productos</h1>
          <Productos />
        </div>
        <div className='contenedor-lista col-12'>
          <h1 className='titulo fs-2 text-white text-center'>Usuarios</h1>
          <Usuarios />
        </div>
        <div className='contenedor-lista col-12'>
          <h1 className='titulo fs-2 text-white text-center'>Pedidos</h1>
          <Pedidos />
        </div>
      </div>
    </div>
  )
}

export default Admin;