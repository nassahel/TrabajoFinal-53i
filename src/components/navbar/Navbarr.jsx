import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./navbar.css";

function Navbarr() {

  let activeStyle = {
    textDecoration: 'underline',
    fontWeight: 'bold'
  }

  return (
    <Navbar expand="lg" className="classnav sticky-top p-3 shadow" data-bs-theme="dark" >
      <NavLink>
        <img src="src\assets\img\hnb.png" width="290" className="d-inline-block align-center me-5" alt="React Bootstrap logo" />
      </NavLink>
      <Container fluid className="text-end fs-5">

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0 me-4" style={{ maxHeight: "100px" }} navbarScroll>
            <NavLink to="/" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Home</NavLink>
            <NavLink to="/admin" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Admin</NavLink>
            <NavLink to="/about" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Nosotros</NavLink>
          </Nav>

          <NavLink to="/register" className='me-4'>
            <BsPersonCircle size='2rem' color="white" />
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
