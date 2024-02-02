import React from 'react';
import '../../public/css/Salita.css';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import ControlTemperatura from '../Elementos/ControlTemperatura';

function Salon() {
  return (
    <div className="salon">
      <h2>Salón</h2>
      <LuzDeTecho />
      <ControlTemperatura />
      <ControlTemperatura />
    </div>
  );
}

export default Salon;