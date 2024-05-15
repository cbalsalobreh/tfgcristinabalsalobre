import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm.js';
import RegisterForm from './components/Login/RegisterForm.js';
import CasaDomotica from './components/Casa/CasaDomotica.js';
import User from './components/Login/User.js';

function App() {

  
  return (
      <div className="App">
        <img src="/CabeceraPWTFG.png" alt='Cabecera de Whisper Living' style={{ height: '100px' }}/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/casa-domotica" element={<CasaDomotica />}/>
            <Route path="/user" element={<User />}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

