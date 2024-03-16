import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la redirección
import '../../public/css/LoginForm.css'

function LoginForm() {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useNavigate(); // Inicializa useNavigate para manejar la redirección

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('/', {
                user: loginUsername,
                password: loginPassword
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    // Función para redirigir a la página de registro
    const redirectToRegister = () => {
        history("/register");
    };

    return (
        <div className='login-container'>
            <div className='login-form-container'>
                <h2>Iniciar Sesión</h2>
                <form className='login-form' onSubmit={handleLoginSubmit}>
                    <div className='form-group'>
                        <label htmlFor="loginUsername">Usuario:</label>
                        <input type="text" id="loginUsername" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="loginPassword">Contraseña:</label>
                        <input type="password" id="loginPassword" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                </form>
                <button onClick={redirectToRegister}>Registrarse</button>
            </div>
            <p className='message' style={{ color: message && message.startsWith('Registro') ? 'green' : 'red' }}>{message}</p>
        </div>
    );
}

export default LoginForm;
