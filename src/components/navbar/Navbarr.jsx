import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function Navbarr() {

  let activeStyle = {
    textDecoration: 'underline',
    fontWeight: 'bold'
  }

  return (
    <Navbar expand="lg" className="classnav sticky-top" data-bs-theme="dark" >
      <Container fluid className="d-flex justify-content-between">
        <NavLink>
          <img src="src\assets\img\fav-icon.png" width="50" className="d-inline-block align-center" alt="React Bootstrap logo" />
        </NavLink>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <NavLink to="/" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Home</NavLink>
            <NavLink to="/admin" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Admin</NavLink>
            <NavLink to="/about" className="nav-link text-light" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Nosotros</NavLink>
          </Nav>
          <Form className="d-flex col-4">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" data-bs-theme="light" />
            <Button variant="outline-light">Buscar</Button>
          </Form>

          <Container className="text-end col-lg-3">
            <NavLink><Button variant="outline-light">Entrar</Button></NavLink>
            <NavLink to="/register">
              <Button variant="outline-light"> Registrarse </Button>
            </NavLink>
            <NavLink to="/user/carrito">
               <Button variant="outline-light">Carrito</Button>
            </NavLink>


          </Container>
        </Navbar.Collapse>


      </Container>
    </Navbar>
  );
}

export default Navbarr;
