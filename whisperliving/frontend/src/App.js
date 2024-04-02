import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm.js';
import RegisterForm from './components/Login/RegisterForm.js';
import CasaDomotica from './components/Casa/CasaDomotica.js';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/casa-domotica" element={<CasaDomotica />}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

