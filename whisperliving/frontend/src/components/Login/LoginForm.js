import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../public/css/LoginForm.css';

function LoginForm() {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/', {
                username: loginUsername,
                password: loginPassword
            });

            const responseData = response.data;

            if (response.status === 200 && responseData.access_token) {
                setMessage('');
                localStorage.setItem('token', responseData.access_token); // Almacena el token en el localStorage
                navigate('/casa-domotica');
            } else {
                setMessage(responseData.message || 'Error: Failed to authenticate');
            }
        } catch (error) {
            setMessage('Error: Failed to authenticate');
        }
    };

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

