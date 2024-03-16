import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la redirección
import '../../public/css/LoginForm.css'

function RegisterForm() {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [message, setMessage] = useState('');
    const history = useNavigate(); // Inicializa useNavigate para manejar la redirección

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/register', {
                user: registerUsername,
                password: registerPassword,
                email: registerEmail
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    // Función para redirigir a la página de inicio de sesión
    const redirectToLogin = () => {
        history("/");
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
                {/* Agrega un botón para redirigir a la página de inicio de sesión */}
                <button onClick={redirectToLogin}>Iniciar Sesión</button>
            </div>
            <p className='message' style={{ color: message && message.startsWith('Registro') ? 'green' : 'red' }}>{message}</p>
        </div>
    );
}

export default RegisterForm;
