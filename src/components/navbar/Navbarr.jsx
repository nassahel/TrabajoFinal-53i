import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logoResto from '../../assets/img/hnb.png'
import "./navbar.css";

function Navbarr() {
  const [userRole, setUserRole] = useState('USER_NORMAL');
  const [cerrarSesion, setCerrarSesion] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const checkeoToken = localStorage.getItem('token');


    if (checkeoToken) {
      const tokenData = JSON.parse(atob(checkeoToken.split('.')[1])); //problema solucionado 
      const tokenUserId = tokenData.uid;


      const apiUrl = 'https://backend-rolling53i.onrender.com/api/usuarios';

      const usuariosGet = async () => {
        try {
          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error(`La solicitud falló con código de estado: ${response.status}`);
          }

          const data = await response.json();
          setUsuarios(data.usuarios);

          const usuarioFind = data.usuarios.find(item => item._id === tokenUserId);

          if (usuarioFind) {
            if (usuarioFind.rol === 'USER_ADMIN') {
              setUserRole('USER_ADMIN');
            }
          }


          setCerrarSesion(true);
        } catch (error) {
          console.error('Error:', error.message);
        }
      }

      usuariosGet();
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
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

