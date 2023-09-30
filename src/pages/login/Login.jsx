import React, { useState, useEffect } from 'react';
import { Form, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
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
        <div className='registro'>
            <div className='form-container'>
                <div className='botones'>
                    <NavLink to="/login">
                        <ToggleButton className='iniciar' variant='info' id="tbg-radio-2" value={2}>
                            Iniciar Sesión
                        </ToggleButton>
                    </NavLink>
                    <NavLink to="/register">
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                            <ToggleButton className='registrarse' variant='info' value={3}>
                                Registrarse
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </NavLink>
                </div>

                <Form className='miFormulario' id="miFormulario" onSubmit={botonIniciar}>

                    <>
                        <Form.Label>Correo:</Form.Label>
                        <Form.Control
                            type="text"
                            aria-describedby='email'
                            placeholder='Ingrese su email'
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </>
                    <>
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control
                            type="password"
                            aria-describedby='password'
                            placeholder='Ingrese su contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </>
                    <Button type='submit' variant="info">Iniciar Sesión</Button>
                </Form>
            </div>
            {error && <p>Todos los campos son obligatorios.</p>}
        </div>
    )
}

export default Login;






