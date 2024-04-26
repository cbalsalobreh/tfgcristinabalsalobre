import React from 'react';
import '../../public/css/Salita.css';
import LuzDeTechoApagada from '../Elementos/LuzDeTechoApagada';
import LuzDeTechoEncendida from '../Elementos/LuzDeTechoEncendida';
import ControlTemperatura from '../Elementos/ControlTemperatura';

function Salita({ temperaturaAire, temperaturaCalefaccion, luzSalita }) {
  return (
    <div className="salita">
      { luzSalita ? <LuzDeTechoEncendida /> : <LuzDeTechoApagada /> }
      <h2>Salita</h2>
      <ControlTemperatura titulo="AC" temperatura={temperaturaAire} />
      <ControlTemperatura titulo="Calefacción" temperatura={temperaturaCalefaccion} />
    </div>
  );
}

export default Salita;
