import React from 'react';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import ControlTemperatura from '../Elementos/ControlTemperatura';
import '../../public/css/Cocina.css'

function Cocina() {
  return (
    <div className="cocina">
      <LuzDeTecho />
      <ControlTemperatura /> <h4>Nevera</h4>
      <ControlTemperatura /> <h4>Congelador</h4>
      <h2>Cocina</h2>
    </div>
  );
}

export default Cocina;
