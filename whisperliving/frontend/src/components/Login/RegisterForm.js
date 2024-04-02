import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../public/css/LoginForm.css';

function RegisterForm() {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        
        // Validación de entrada
        if (registerUsername === '' || registerPassword === '' || registerEmail === '') {
            setMessage('Por favor, complete todos los campos');
            return;
        }
    
        // Continuar con el envío del formulario
        try {
            const response = await axios.post('/register', {
                username: registerUsername,
                password: registerPassword,
                email: registerEmail
            });
    
            const responseData = response.data;
    
            if (response.status === 200) {
                setMessage(responseData.message);
                localStorage.setItem('token', responseData.access_token); // Almacena el token en el localStorage
                navigate('/casa-domotica');
            } else {
                setMessage(responseData.message || 'Error: Failed to register');
            }
        } catch (error) {
            setMessage('Error: Failed to register');
        }
    };
    
    const redirectToLogin = () => {
        navigate("/");
    };

    return (
        <div className='register-container'>
            <div className='register-form-container'>
                <h2>Registrarse</h2>
                <form className='register-form' onSubmit={handleRegisterSubmit}>
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
                    <button type="submit">Registrarse</button>
                </form>
                <button onClick={redirectToLogin}>Iniciar Sesión</button>
            </div>
            {message && <p className='message' style={{ color: 'red' }}>{message}</p>}
        </div>
    );
}

export default RegisterForm;

