import React, { useState } from 'react';
import './Register.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { Link } from 'react-router-dom';

function Register() {


  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [direc, setDirec] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [rol, setRol] = useState("USER_NORMAL");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (nombre === "" || correo === "" || direc === "" || password === "" || confirmPassword === "") {
      setError(true);
      return;
    } else if (password !== confirmPassword) {
      setError(true);
      return;
    }
    setError(false);

    try {
      const response = await fetch('https://backend-rolling53i.onrender.com/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo, direc, password, rol, estado: true }),
      });

      if (!response.ok) {
        console.error('Error en el registro:', response.statusText);
      }

      alert('Cuenta creada con éxito.\nInicie sesión')

      limpiarFormulario();
      window.location.href = ('/login');

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setCorreo("");
    setDirec("");
    setPassword("");
    setConfirmPassword("");
    document.getElementById("miFormulario").reset();
  };

  return (
    <div className='mx-auto my-auto bg-dark bg-opacity-75 rounded border border-success col-sm-6 col-md-6 col-lg-5'>
      <div className='form-container mx-auto py-2'>
        <div className='mb-3 justify-content-center'>
          <h3 className='text-white'>Registra tu cuenta</h3>
        </div>
        <Form id='miFormulario' onSubmit={handleRegister}>
          <div>
            <Form.Label className='text-white' >Nombre:</Form.Label>
            <Form.Control
              required
              aria-describedby="name"
              type="text"
              placeholder='Ingrese su nombre'
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className='mt-1'>
            <Form.Label className='text-white' >Correo:</Form.Label>
            <Form.Control
              required
              type="email"
              aria-describedby="correo"
              placeholder='Ingrese su correo'
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className='mt-1'>
            <Form.Label className='text-white'>Direccion:</Form.Label>
            <Form.Control
              required
              type="text"
              aria-describedby="direc"
              placeholder='Ingrese su dirección'
              onChange={(e) => setDirec(e.target.value)}
            />
          </div>
          <div className='mt-1'>
            <Form.Label className='text-white'>Contraseña:</Form.Label>
            <Form.Control
              required
              type="password"
              aria-describedby="passwordHelpBlock"
              placeholder='Ingrese su contraseña'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mt-1'>
            <Form.Label className='text-white'>Repetir Contraseña:</Form.Label>
            <Form.Control
              required
              type="password"
              aria-describedby="confirmPasswordHelpBlock"
              placeholder='Repetir contraseña'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Form.Text className='text-info' id="confirmPasswordHelpBlock">
              *Por favor, repita la misma contraseña.
            </Form.Text>
          </div>
          <div className='d-flex mt-3 text-white '>
            <Form.Check
              required
              name="terminos-condiciones"
              type={'checkbox'}
            />
            <p className='ms-2'>Acepto terminos y condiciones</p>

          </div>
          <div className='mb-3 d-flex justify-content-center'>
            <Button type='submit' variant="info">Registrarse</Button>
          </div>

        </Form>

        <Link className='text-decoration-none fw-normal fs-6 text-secondary' to="/login">¿Ya tenes cuenta? <span className='fw-bold'>Inicia Sesion</span></Link>

        {
          error && <p className='mt-3 fw-semibold text-danger mb-0'>Todos los campos son obligatorios.</p>
        }
      </div>
    </div>
  )
}

export default Register