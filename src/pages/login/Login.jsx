import React, { useState, useEffect } from 'react';
import { Form, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import './login.css';

function Login() {
    const obtenerLogin = () => {
        let datos = localStorage.getItem("registros");
        if (datos) {
            return JSON.parse(datos);
        } else {
            return [];
        }
    }

    const [registros, setRegistros] = useState(obtenerLogin());
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)

    const botonIniciar = (e) => {
        e.preventDefault();

        if (nombre === "" || password === "") {
            setError(true);
            return;
        } else {
            setError(false);

            // Guarda el nombre del usuario en el localStorage
            localStorage.setItem("nombreUsuario", nombre);

            navigate("/");
            limpiarFormulario();
        }
    }

    const limpiarFormulario = () => {
        setNombre("");
        setPassword("");
        document.getElementById("miFormulario").reset();
    }

    useEffect(() => {
        localStorage.setItem("registros", JSON.stringify(registros));
    }, [registros]);

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
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            type="text"
                            aria-describedby='name'
                            placeholder='Ingrese su nombre'
                            onChange={(e) => setNombre(e.target.value)}
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
                    <Form>
                        {['Acepto términos y condiciones'].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                    type={'checkbox'}
                                    id={`default-${type}`}
                                    label={` ${type}`}
                                />
                            </div>
                        ))}
                    </Form>
                    <Button type='submit' variant="info">Iniciar Sesión</Button>
                </Form>
            </div>
            {error && <p>Todos los campos son obligatorios.</p>}
        </div>
    )
}

export default Login;







