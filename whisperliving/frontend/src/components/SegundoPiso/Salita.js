import React from 'react';
import '../../public/css/Salita.css';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import ControlTemperatura from '../Elementos/ControlTemperatura';

function Salita() {
  return (
    <div className="salita">
      <LuzDeTecho />
      <ControlTemperatura />
      <ControlTemperatura />
      <h2>Salita</h2>
    </div>
  );
}

export default Salita;