import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
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
                const response = await fetch('https://backend-rolling53i.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ correo, password }),
                });

                if (response.ok) {

                    const data = await response.json();
                    const token = data.token;


                    localStorage.setItem('token', token);


                    setCorreo("");
                    setPassword("");

                    window.location.href = ('/');
                } else {

                    console.error('Error al iniciar sesión:', response.statusText);
                }
            } catch (error) {
                console.error('Error al iniciar sesión:', error.message);
            }
        }
    }
    return (
        <div className='mx-auto my-auto bg-dark bg-opacity-75 rounded border border-success col-sm-6 col-md-6 col-lg-5'>
            <div className='form-container mx-auto my-auto'>
                <Form id="miFormulario" onSubmit={botonIniciar}>
                    <div>
                        <h3 className='text-white mt-2'>Inicio de sesion</h3>
                    </div>
                    <div>
                        <Form.Label className='correo'>Correo:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            aria-describedby='email'
                            placeholder='Ingrese su email'
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className='mt-1'>
                        <Form.Label className='contraseña'>Contraseña:</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            aria-describedby='password'
                            placeholder='Ingrese su contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='mb-3 d-flex justify-content-center'>
                        <Button className='mt-3' type='submit' variant="info">Iniciar Sesión</Button>
                    </div>
                </Form>
                <div className='mb-2'>
                    <Link className='text-decoration-none fw-normal fs-6 text-secondary' to="/register">¿No tiene cuenta? <span className='fw-bold'>Registrate</span></Link>
                </div>
            </div>
            {error && <p className='mt-3 fw-semibold text-danger mb-0'>Todos los campos son obligatorios.</p>}
        </div>
    )
}

export default Login;






