import React from 'react'
import './Login.css'
import { Form } from '../../components/form/form'
import { Main } from '../../components/main/Main'
import { useState } from 'react'

function Login() {

    const [user, setUser] = useState([])

    return (
        <div className='login'>
            {
                !user.length > 0 ? <Form setUser={setUser} /> : <Main />
            }
            <Form setUser={setUser} />

        </div>
    )
}
export default Login