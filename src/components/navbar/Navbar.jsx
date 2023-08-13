import React from 'react'

function Navbar() {
  return (
    <div>
        <nav class="navbar bg-body-tertiary shadow mb-5">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
        <img src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-restaurant-logo-design-vector-template-png-image_5441058.jpg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />
      Gastronova
    </a>
    <form class="d-flex col-5" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-primary" type="submit">Buscar</button>
      </form>
      <div>
      <button type="button" class="btn btn-link">Entrar</button>
      <button type="button" class="btn btn-link">Registrarse</button>
      </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar