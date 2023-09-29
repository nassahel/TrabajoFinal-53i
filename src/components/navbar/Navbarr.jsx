
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Offcanvas from 'react-bootstrap/Offcanvas';
import logoResto from '../../assets/img/hnb.png'
import "./navbar.css";

function Navbarr() {

  const [userRole, setUserRole] = useState('USER_NORMAL'); // Cambia el valor inicial según tus necesidades
  const [cerrarSesion, setCerrarSesion] = useState('');

  const [usuarios, setUsuarios] = useState([]); // Inicializa 'usuarios' como un arreglo vacío

  useEffect(() => {
    const checkeoToken = localStorage.getItem('token');
    
    if (checkeoToken !== null) {
      setCerrarSesion(true);
      const token = JSON.parse(atob(checkeoToken.split('.')[1]));
      const apiUrl = 'https://backend-rolling53i.onrender.com/api/usuarios';

      const usuariosGet = async () => {
        try {
          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error(`La solicitud falló con código de estado: ${response.status}`);
          }

          const data = await response.json();
          console.log('Datos recibidos:', data);

          setUsuarios(data.usuarios);

          // Para ver que me trae del TOKEN y la DB
          console.log(token.uid)        // ID obtenida de token
          console.log(usuarios._id);    // ID obtenida de DB

          const usuarioFind = usuarios.find(item => item.id === token.uid);
        
          if (usuarioFind) {
            console.log('Se encontró el ID', token.id);
          } else {
            console.log('No se encontró el ID');
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }

      usuariosGet();
    }
  }, []); 

  /*const [usuarios, setUsuarios] = useState('[]')
  
  useEffect(() => {

    const checkeoToken = localStorage.getItem('token');
    if (checkeoToken !== null) {
      setCerrarSesion(true);
      const token = JSON.parse(atob(checkeoToken.split('.')[1]));

      const apiUrl = 'https://backend-rolling53i.onrender.com/api/usuarios';

      const usuariosGet = async () => {
        try {
          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error(`La solicitud falló con código de estado: ${response.status}`);
          }

          const data = await response.json();
          console.log('Datos recibidos:', data);
          setUsuarios([data.usuarios])
          console.log(usuarios);
        } catch (error) {
          console.error('Error:', error.message);
        }
      }

      usuariosGet();

      if (Array.isArray(usuarios)) {
        const usuarioFind = usuarios.find(item => item.id === token.id);
      
        if (usuarioFind) {
          console.log('Se encontró el ID', token.id);
        } else {
          console.log('No se encontró el ID');
        }
      }

    } else {
      setCerrarSesion(false);
    }
  }, [cerrarSesion]);*/


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
    <>
      <Navbar collapseOnSelect key="lg" expand="lg" className="classnav sticky-top shadow p-lg-3 fs-5 mb-3" data-bs-theme="dark">
        <Container fluid>
          <NavLink to="/">
            <img src={logoResto} width="260" className="d-inline-block align-center" alt="React Bootstrap logo" />
          </NavLink>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg classnav" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
            data-bs-theme="dark"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                Menú
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-4 mb-2">
                <NavLink to="/" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Inicio</NavLink>
                <NavLink to="/about" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Nosotros</NavLink>
                {userRole === 'USER_ADMIN' && (
                  <NavLink to="/admin">Admin</NavLink>
                )}
                {cerrarSesion && (
                  <>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                  </>
                )}
              </Nav>
              <NavLink to="/register" className='me-4' >
                <BsPersonCircle size='2rem' color='white' />
              </NavLink >

              <NavLink to="#">
                <AiOutlineShoppingCart size='2rem' color='white' />
              </NavLink>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarr;
