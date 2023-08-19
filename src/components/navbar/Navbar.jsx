import React, { useState } from 'react'
import ModalLogin from '../login/ModalLogin'
import "./navbar.css"


function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div class="sticky-top ">
      <nav className="navbar classnav  mb-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="src\assets\img\fav-icon.png" alt="Logo" width="80" className="d-inline-block align-text-top" />
          </a>
          <form className="d-flex col-5 ms-5" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Buscar</button>
          </form>
          <div>
            <button type="submit" className="btn btn-outline-light" onClick={handleShow}>Entrar</button>
            <button type="button" className="btn btn-outline-light ms-3">Registrarse</button>
          </div>
        </div>
      </nav>
      <ModalLogin show={show} handleClose={handleClose} />
    </div>
  )
}

export default Navbar