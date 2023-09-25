import React, { useState, useEffect } from 'react';
import './login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { NavLink, useNavigate } from 'react-router-dom';




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
            setError(true)
            return
        } else setError(false)
        navigate("/");

        setError(false)

        let miObjeto = { nombre, password }
        setRegistros([...registros, miObjeto]);
        limpiarFormulario();
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
            <div className=''>
                <div className='botones'>

                    <NavLink to="/login">
                        <ToggleButton className='iniciar' variant='info' id="tbg-radio-2" value={2}>
                            Iniciar Sesion
                        </ToggleButton>
                    </NavLink>
                    <NavLink to="/register">
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                            <ToggleButton id="tbg-radio-3" variant='info' value={3}>
                                Registrarse
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </NavLink>
                </div>

                <Form className='' id="miFormulario" onSubmit={botonIniciar}>
                    <div>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Ingrese su nombre'
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder='Ingrese su contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <h6>  *Su contraseña debe tener un minimo de 6 caracteres.</h6>
                    </div>

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
                    <Button type='submit' variant="info" >Iniciar Sesion</Button>
                </Form>
            </div>
            {error && <p>todos los campos son obligatorios.</p>}
        </div >

    )
}

export default Login








