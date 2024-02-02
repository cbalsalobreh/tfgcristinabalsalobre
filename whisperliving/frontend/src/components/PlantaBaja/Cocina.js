import React from 'react';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import ControlTemperatura from '../Elementos/ControlTemperatura';
import '../../public/css/Cocina.css'

function Cocina() {
  return (
    <div className="cocina">
      <h2>Cocina</h2>
      <LuzDeTecho />
      <ControlTemperatura />
    </div>
  );
}

export default Cocina;
