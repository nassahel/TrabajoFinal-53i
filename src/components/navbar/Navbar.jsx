import React from 'react'
import "./navbar.css"

function Navbar() {
  return (
    <div class="sticky-top">
      <nav class="navbar nav_color  shadow mb-5">
        <div class="container-fluid">
          <a class="navbar-brand fs-3" href="#">
            <img src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-restaurant-logo-design-vector-template-png-image_5441058.jpg" alt="Logo" width="40" class="d-inline-block align-text-top me-2" />
            Santorini
          </a>
          <form class="d-flex col-5" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-light" type="submit">Buscar</button>
          </form>
          <div>
            <button type="button" class="btn btn-light me-2">Entrar</button>
            <button type="button" class="btn btn-light">Registrarse</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar