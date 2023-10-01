import React, { useState, useEffect } from 'react';
import { Form, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import './login.css';

function Login() {
    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const botonIniciar = async (e) => {
        e.preventDefault();

        if (correo === "" || password === "") {
            setError(true);
            return;
        } else {
            setError(false);

            try {
                // Realiza una solicitud a la API para autenticar al usuario y obtener un token
                const response = await fetch('https://backend-rolling53i.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ correo, password }),
                });

                if (response.ok) {
                    // Usuario ha iniciado sesión correctamente, obtén el token de la respuesta
                    const data = await response.json();
                    const token = data.token;

                    // Almacena el token en el almacenamiento local (localStorage)
                    localStorage.setItem('token', token);

                    // Limpia los campos del formulario
                    setCorreo("");
                    setPassword("");

                    // Redirige al usuario a la página de inicio
                    // navigate('/');
                    window.location.href = ('/');
                } else {
                    // El inicio de sesión falló
                    console.error('Error al iniciar sesión:', response.statusText);
                }
            } catch (error) {
                console.error('Error al iniciar sesión:', error.message);
            }
        }
    }
    return (
        <div className='registro bg-opacity-75 col-sm-6 col-md-5 col-lg-3'>
            <div className='form-container'>
                <Form className='miFormulario' id="miFormulario" onSubmit={botonIniciar}>
                    <div className='miFormulario'>
                        <h5 className='text-white'>Inicio de sesion</h5>
                    </div>
                    <>
                        <Form.Label className='correo'>Correo:</Form.Label>
                        <Form.Control
                            type="text"
                            aria-describedby='email'
                            placeholder='Ingrese su email'
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </>
                    <>
                        <Form.Label className='contraseña'>Contraseña:</Form.Label>
                        <Form.Control className='inputcontraseña ml-3'
                            type="password"
                            aria-describedby='password'
                            placeholder='Ingrese su contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </>
                    <div className='d-flex flex-column'>
                        <Button className=' mb-6 mt-3' type='submit' variant="info">Iniciar Sesión</Button>

                        <Link className='text-decoration-none fw-normal fs-6 text-secondary' to="/register">¿No tiene cuenta? Registrate</Link>
                    </div >
                </Form>
            </div>
            {error && <p>Todos los campos son obligatorios.</p>}
        </div>
    )
}

export default Login;






