import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import '../../public/css/LoginForm.css';

const socket = io.connect('http://localhost:5001');

function LoginForm() {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Al montar el componente, solicita y guarda el token CSRF
        fetchCsrfToken();
    }, []);

    const fetchCsrfToken = async () => {
        try {
            const response = await fetch('http://localhost:5001/');
            const data = await response.json();
            setCsrfToken(data.csrf_token);
        } catch (error) {
            console.error('Error al obtener el token CSRF:', error);
        }
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        // Envía los datos de inicio de sesión al servidor junto con el token CSRF
        socket.emit('login', { loginUsername, loginPassword, csrfToken });
    };

    socket.on('login_response', (data) => {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else {
            const errorMessage = data.message || 'Inicio de sesión fallido';
            setMessage(errorMessage);
        }

    });

    const redirectToRegister = () => {
        navigate('/register');
    };

    return (
        <div className='login-container'>
            <div className='login-form-container'>
                <h2>Iniciar Sesión</h2>
                <form className='login-form' onSubmit={handleLoginSubmit}>
                    <div className='form-group'>
                        <label htmlFor='loginUsername'>Usuario:</label>
                        <input type='text' id='loginUsername' value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='loginPassword'>Contraseña:</label>
                        <input type='password' id='loginPassword' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    </div>
                    <button type='submit'>Iniciar Sesión</button>
                </form>
                <button onClick={redirectToRegister}>Registrarse</button>
            </div>
            {message && <p className='message' style={{ color: 'red' }}>{message}</p>}
        </div>
    );
}

export default LoginForm;
