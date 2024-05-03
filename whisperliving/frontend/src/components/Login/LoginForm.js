import React, { useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import '../../public/css/LoginForm.css';

const ENDPOINT = 'http://localhost:5001'; // Reemplaza localhost:5001 con la dirección y puerto de tu servidor Flask-SocketIO
const socket = io(ENDPOINT);

function LoginForm() {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        console.log('Evento "login" emitido')
        // Envía los datos de inicio de sesión al servidor
        socket.emit('login', { loginUsername, loginPassword });
        console.log('Datos de login enviados al backend')
    };

    socket.on('login_response', (data) => {
        console.log('Evento login_response recibido:', data); // Verifica los datos recibidos del servidor
    
        if (data.redirect) {
            console.log('Redirigiendo a:', data.redirect); // Verifica la URL de redirección
    
            window.location.href = data.redirect;
            console.log('Redirigiendo'); // Verifica si la redirección se está realizando correctamente
        } else {
            const errorMessage = data.message || 'Inicio de sesión fallido';
            console.error(errorMessage);
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
