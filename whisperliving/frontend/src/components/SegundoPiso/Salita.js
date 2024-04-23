import React from 'react';
import '../../public/css/Salita.css';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import ControlTemperatura from '../Elementos/ControlTemperatura';

function Salita({ temperaturaAire, temperaturaCalefaccion }) {
  return (
    <div className="salita">
      <LuzDeTecho />
      <ControlTemperatura titulo="AC" temperatura={temperaturaAire} />
      <ControlTemperatura titulo="Calefacción" temperatura={temperaturaCalefaccion} />
      <h2>Salita</h2>
    </div>
  );
}

export default Salita;
