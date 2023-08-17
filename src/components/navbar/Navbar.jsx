import React, { useState } from 'react'
import ModalLogin from '../login/ModalLogin'


function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <nav className="navbar bg-body-tertiary shadow mb-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-restaurant-logo-design-vector-template-png-image_5441058.jpg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
            Gastronova
          </a>
          <form className="d-flex col-5" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-primary" type="submit">Buscar</button>
          </form>
          <div>
            <button type="submit" className="btn btn-link" onClick={handleShow}>Entrar</button>
            <button type="button" className="btn btn-link">Registrarse</button>
          </div>
        </div>
      </nav>
      <ModalLogin show={show} handleClose={handleClose} />
    </div>
  )
}

export default Navbar