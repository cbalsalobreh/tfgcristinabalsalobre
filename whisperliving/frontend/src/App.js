import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm.js';
import RegisterForm from './components/Login/RegisterForm.js';
import CasaDomotica from './components/Casa/CasaDomotica.js';
import Salita from './components/SegundoPiso/Salita.js';
import Cuarto from './components/SegundoPiso/Cuarto.js';
import HabitacionPrincipal from './components/PlantaBaja/HabitacionPrincipal.js';
import Cocina from './components/PlantaBaja/Cocina.js';
import Salon from './components/PlantaBaja/Salon.js';
import Jardin from './components/PlantaBaja/Jardin.js';

function App() {

  
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/casa-domotica" element={<CasaDomotica />}/>
            <Route path="/salita" element={<Salita />}/>
            <Route path="/cuarto-1" element={<Cuarto />}/>
            <Route path="/cuarto-2" element={<Cuarto />}/>
            <Route path="/hab-princ" element={<HabitacionPrincipal />}/>
            <Route path="/cocina" element={<Cocina />}/>
            <Route path="/salon" element={<Salon />}/>
            <Route path="/jardin" element={<Jardin />}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

