import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./navbar.css";

function Navbarr() {

  let activeStyle = {
    textDecoration: 'underline',
    fontWeight: 'bold'
  }

  return (
        <>
        <Navbar key="lg" expand="lg" className="classnav sticky-top shadow p-3 fs-5 mb-3" data-bs-theme="dark">
          <Container fluid>
            <NavLink to="/">
              <img src="src\assets\img\hnb.png" width="290" className="d-inline-block align-center me-5" alt="React Bootstrap logo" />
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
                  <NavLink to="/admin" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Admin</NavLink>
                </Nav>
                <NavLink to="/register" className='me-4'>
                  <BsPersonCircle size='2rem' color="white" />
                </NavLink >

                <NavLink to="/user/carrito">
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
