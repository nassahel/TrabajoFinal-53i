import React, { useEffect, useState } from 'react'
import './Register.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { NavLink } from 'react-router-dom';

function Register() {

  const obtenerRegistro = () => {
    let datos = localStorage.getItem("registros");
    if (datos) {
      return JSON.parse(datos);
    } else {
      return [];
    }
  }

  const [registros, setRegistros] = useState(obtenerRegistro());

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [password, setPassword] = useState("");

  const botonCrear = (e) => {
    e.preventDefault();
    let miObjeto = { nombre, email, adress, password }
    setRegistros([...registros, miObjeto]);
    limpiarFormulario();
  }

  const limpiarFormulario = () => {
    setNombre("");
    setEmail("");
    setAdress("");
    setPassword("");
    document.getElementById("miFormulario").reset();
  }

  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros));
  }, [registros]);


  return (
    <div className='registro'>
      <div className=''>
        <div>
          <NavLink to="/login">
            <ToggleButton id="tbg-radio-2" value={2}>
              Iniciar Sesion
            </ToggleButton>
          </NavLink>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton id="tbg-radio-3" value={3}>
              Registrarse
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Form id='miFormulario' onSubmit={botonCrear}>
          <>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              aria-describedby="name"
              placeholder='Ingrese su nombre'
              onChange={(e) => setNombre(e.target.value)}
            />
          </>
          <div>
            <Form.Label >Email</Form.Label>
            <Form.Control
              type="email"
              aria-describedby="email"
              placeholder='Ingrese su email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <>
              <Form.Label >Direccion</Form.Label>
              <Form.Control
                type="text"
                aria-describedby="adress"
                placeholder='Ingrese su dirección'
                onChange={(e) => setAdress(e.target.value)}
              />
            </>
          </div>
          <>
            <Form.Label >Contraseña</Form.Label>
            <Form.Control
              type="password"
              aria-describedby="passwordHelpBlock"
              placeholder='Ingrese su contraseña'
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text id="inputPassword" muted>
              *Su contraseña debe tener entre 8 y 20 caracteres, contener letras y números.

            </Form.Text>
          </>
          <Form>
            {['Acepto terminos y condiciones'].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  type={'checkbox'}
                  id={`default-${type}`}
                  label={` ${type}`}
                />
              </div>
            ))}
          </Form>
          <div>
            <Button type='submit' variant="primary">Registrarse</Button>{' '}
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register