import React from 'react'
import Productos from '../../components/Admin/productos'
import './admin.css'
import Usuarios from '../../components/Admin/usuarios'
import Pedidos from '../../components/Admin/pedidos'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Admin() {
  return (
    <div className='container-fluid contenedor-completo mt-4'>
    <Tabs
    defaultActiveKey="home"
    id="uncontrolled-tab-example"
    className="mb-3">
    <Tab className='tab' eventKey="home" title="Productos">
      <Productos/>
    </Tab>
    <Tab eventKey="profile" title="Usuarios">
      <Usuarios/>
    </Tab>
    <Tab eventKey="contact" title="Pedidos">
      <Pedidos/>
    </Tab>
  </Tabs>
    </div>
  )
}

export default Admin;