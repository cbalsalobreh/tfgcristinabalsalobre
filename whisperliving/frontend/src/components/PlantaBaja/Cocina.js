import React from 'react';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import ControlTemperatura from '../Elementos/ControlTemperatura';
import '../../public/css/Cocina.css'

function Cocina({ temperaturaNevera, temperaturaCongelador }) {
  return (
    <div className="cocina">
      <LuzDeTecho />
      <ControlTemperatura titulo="Nevera" temperatura={temperaturaNevera}/>
      <ControlTemperatura titulo="Congelador" temperatura={temperaturaCongelador}/>
      <h2>Cocina</h2>
    </div>
  );
}

export default Cocina;
