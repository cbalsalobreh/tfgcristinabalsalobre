import React from 'react';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import ControlTemperatura from '../Elementos/ControlTemperatura';
import '../../public/css/Cocina.css'

function Cocina() {
  return (
    <div className="cocina">
      <LuzDeTecho />
      <ControlTemperatura />
      <h2>Cocina</h2>
    </div>
  );
}

export default Cocina;
