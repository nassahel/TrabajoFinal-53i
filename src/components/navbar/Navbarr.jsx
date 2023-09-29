
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logoResto from '../../assets/img/hnb.png'
import "./navbar.css";

function Navbarr() {

  const [isAdmin, setIsAdmin] = useState(false);

  const [cerrarSesion, setCerrarSesion] = useState('');

  useEffect(() => {

    const checkeoToken = localStorage.getItem('token');
    if (checkeoToken !== null) {
      setCerrarSesion(true);
    } else {
      setCerrarSesion(false)

    }
  }, [cerrarSesion]);




  let activeStyle = {
    textDecoration: 'underline',
    textDecorationColor: '#FFC107',
    fontWeight: 'bold'
  }
  const handleLogout = () => {
    // Eliminar el token del almacenamiento local (localStorage)
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/login'; // Redirigir a la página de inicio de sesión
  };

  return (
    <Navbar collapseOnSelect expand="md" className="classnav sticky-top shadow p-lg-3 fs-5 mb-3" data-bs-theme="dark">
      <Container fluid>
        <NavLink to="/">
          <img src={logoResto} width="260" className="d-inline-block align-center" alt="React Bootstrap logo" />
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav classnav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-4 mb-2">
            <NavLink to="/" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Inicio</NavLink>
            <NavLink to="/about" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Nosotros</NavLink>
            <NavLink to="/admin" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Admin</NavLink>
           
          </Nav>
          <NavLink to="/register" className='me-4' >
             {cerrarSesion && (
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Cerrar Sesión</button>
               )}
            <BsPersonCircle size='2rem' color='white' />
          </NavLink >

          <NavLink to="#">
            <AiOutlineShoppingCart size='2rem' color='white' />
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Navbarr;
