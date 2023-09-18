import React, { useState, useEffect } from 'react';
import './login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { NavLink } from 'react-router-dom';

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


    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");


    const botonIniciar = (e) => {
        e.preventDefault();
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
                <div>
                    {/* =====================Esto son los botones de iniciar sesion y registrarse =========================0000*/}
                    <NavLink to="/login">
                        <ToggleButton id="tbg-radio-2" value={2}>
                            Iniciar Sesion
                        </ToggleButton>
                    </NavLink>
                    <NavLink to="/register">
                        <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                            <ToggleButton id="tbg-radio-3" value={3}>
                                Registrarse
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </NavLink>
                </div>
                {/* ============================================================================================= */}
                <Form className='' id="miFormulario" onSubmit={botonIniciar}>
                    <div>
                        <Form.Label >Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Ingrese su nombre'
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder='Ingrese su contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <h6>  *Su contraseña debe tener entre 8 y 20 caracteres, contener letras y números.</h6>
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
                    <Button type='submit' variant="primary" >Iniciar Sesion</Button>
                </Form>
            </div>
        </div >

    )
}
export default Login







