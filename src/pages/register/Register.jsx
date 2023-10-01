import React, { useState } from 'react';
import './Register.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { NavLink, useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

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
        body: JSON.stringify({ nombre, correo, direc, password, rol }),
      });

      if (response.ok) {
        const data = await response.json();

        // Guarda el token en localStorage
        localStorage.setItem('token', data.token);

        // Limpia el formulario y redirige
        limpiarFormulario();
        window.location.href = ('/');
      } else {
        // Maneja errores de registro aquí
        console.error('Error en el registro:', response.statusText);
      }
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

  const handleLogout = () => {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');
    // Redirige al usuario a la página de inicio de sesión
    navigate('/login');
  };


  return (
    <div className='registro col-sm-6 col-md-5 col-lg-3'>
      <div className=''>
        <div className='mb-3'>
          <h3 className='text-white'>Registra tu cuenta</h3>
        </div>
        <Form id='miFormulario' onSubmit={handleRegister}>
          <div>
            <Form.Label className='text-white' >Nombre:</Form.Label>
            <Form.Control
              aria-describedby="name"
              type="text"
              placeholder='Ingrese su nombre'
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <Form.Label className='text-white' >correo:</Form.Label>
            <Form.Control
              type="correo"
              aria-describedby="correo"
              placeholder='Ingrese su correo'
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div>
            <Form.Label className='text-white'>Direccion:</Form.Label>
            <Form.Control
              type="text"
              aria-describedby="direc"
              placeholder='Ingrese su dirección'
              onChange={(e) => setDirec(e.target.value)}
            />
          </div>
          <div>
            <Form.Label className='text-white'>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              aria-describedby="passwordHelpBlock"
              placeholder='Ingrese su contraseña'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Form.Label className='text-white'>Repetir Contraseña:</Form.Label>
            <Form.Control
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
          <div className='d-flex justify-content-center'>
            <Button type='submit' variant="info">Registrarse</Button>
          </div>

        </Form>

        <Link className='text-decoration-none fw-normal fs-6 text-secondary' to="/login">¿Ya tenes cuenta? Inicia Sesion</Link>
        <div>

          {localStorage.getItem('token') ? (
            <Button variant="danger" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          ) : null}

        </div>
        {error && <p>todos los campos son obligatorios.</p>}
      </div>
    </div>
  )
}

export default Register