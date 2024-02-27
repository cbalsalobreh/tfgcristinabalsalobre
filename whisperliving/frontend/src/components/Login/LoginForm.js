import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import '../../public/css/LoginForm.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        //Validación del usuario y la contraseña
        if (username === 'usuario' && password === 'contraseña') {
            setMessage('Inicio de sesión exitoso');
            //navigate.push('/casa-domotica');
        } else {
            setMessage('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className='login-form-container'>
            <h1>LOGIN</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            <p style={{ color: message.startsWith('Inicio') ? 'green' : 'red' }}>{message}</p>
        </div>
    );
}

export default LoginForm;
