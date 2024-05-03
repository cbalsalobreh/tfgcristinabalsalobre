import React, { useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import '../../public/css/LoginForm.css';

const ENDPOINT = 'http://localhost:5001';
const socket = io(ENDPOINT);

function RegisterForm() {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [message] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Evento "register" emitido');
        socket.emit('register', { registerUsername, registerEmail, registerPassword });
        console.log('Datos enviados al backend')
      };
    
    const redirectToLogin = () => {
        navigate("/");
    };

    return (
        <div className='register-container'>
            <div className='register-form-container'>
                <h2>Registrarse</h2>
                <form className='register-form'>
                    <div className='form-group'>
                        <label htmlFor="registerUsername">Usuario:</label>
                        <input type="text" id="registerUsername" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="registerPassword">Contraseña:</label>
                        <input type="password" id="registerPassword" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="registerEmail">Correo electrónico:</label>
                        <input type="email" id="registerEmail" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                    </div>
                    <button type="submit" onClick={handleSubmit}>Registrarse</button>
                </form>
                <button onClick={redirectToLogin}>Iniciar Sesión</button>
            </div>
            {message && <p className='message' style={{ color: 'red' }}>{message}</p>}
        </div>
    );
}

export default RegisterForm;

