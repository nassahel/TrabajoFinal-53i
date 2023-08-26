import React from 'react'
import './login.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { NavLink } from 'react-router-dom';

function Login() {
    return (

        <div className='registro'>

            <div className=''>
                <div>
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
                <div>
                    <Form.Label htmlFor="inputEmail">Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="inputEmail"
                        aria-describedby="email"
                    />
                    <Form.Text id="inputEmail" muted>
                        *Ingrese su email
                    </Form.Text>
                </div>
                <>
                    <Form.Label htmlFor="inputPassword">Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword"
                        aria-describedby="passwordHelpBlock"
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
                    <Button variant="primary">Enviar</Button>{' '}
                </div>
            </div>
        </div>

    )
}
export default Login








