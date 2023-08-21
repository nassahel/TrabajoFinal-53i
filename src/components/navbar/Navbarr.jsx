import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "./navbar.css";

function Navbarr() {
  return (
    <Navbar expand="lg" className="classnav" >
      <Container fluid>
        <NavLink><img
          src="src\assets\img\fav-icon.png"
          width="50"
          className="d-inline-block align-center"
          alt="React Bootstrap logo"
        /></NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/admin" className="nav-link">Admin</NavLink>
            <NavLink to="/about" className="nav-link">Nosotros</NavLink>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Buscar</Button>
          </Form>
        </Navbar.Collapse>
        <NavLink>
          <Button variant="outline-light">Entrar</Button>
        </NavLink>
        <NavLink to="/register">
          <Button variant="outline-light"> Registrarse </Button>
        </NavLink>
      </Container>
    </Navbar>
  );
}

export default Navbarr;
