import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5001');

const User = ({ setUserData }) => {
    const [userData, setLocalUserData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);

    useEffect(() => {
        console.log("Conectando al socket...");
        // Manejar la recepción de datos del usuario
        socket.on('user_data', function(userData){});

        // Manejar el evento de cambio de contraseña
        socket.on('password_changed', (data) => {
            if (data.success) {
                setPasswordChanged(true);
                // Actualizar userData con la nueva contraseña
                setLocalUserData((prevData) => ({
                    ...prevData,
                    password: newPassword
                }));
                setNewPassword('');
            } else {
                setPasswordChanged(false);
            }
        });

        // Limpiar los eventos del socket cuando el componente se desmonte
        return () => {
            socket.off('user_data');
            socket.off('password_changed');
        };
    }, [newPassword, setUserData]);

    const handlePasswordChange = () => {
        // Enviar solicitud al servidor para cambiar la contraseña
        socket.emit('change_password', { newPassword });
    };

    return (
        <div>
            <h2>Datos de usuario</h2>
            {userData ? (
                <div>
                    <p>Username: {userData[0].username}</p>
                    <p>Email: {userData[0].email}</p>
                    <p>
                        Password: {showPassword ? userData[0].password : '*'.repeat(userData[0].password.length)}
                        <button onClick={() => setShowPassword(!showPassword)}>Show/Hide</button>
                    </p>
                    {passwordChanged && <p>Password changed successfully!</p>}
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                    />
                    <button onClick={handlePasswordChange}>Cambiar contraseña</button>
                </div>
            ) : (
                <p>No se han recibido datos.</p>
            )}
        </div>
    );
};

export default User;
