import React from 'react';
import '../../public/css/Salita.css';
import LuzDeTechoApagada from '../Elementos/LuzDeTechoApagada';
import LuzDeTechoEncendida from '../Elementos/LuzDeTechoEncendida';
import ControlTemperatura from '../Elementos/ControlTemperatura';

function Salita({ temperaturaAire, temperaturaCalefaccion, luzSalita }) {
  return (
    <div className="salita">
      { luzSalita ? <LuzDeTechoEncendida /> : <LuzDeTechoApagada /> }
      <ControlTemperatura titulo="AC" temperatura={temperaturaAire} />
      <ControlTemperatura titulo="Calefacción" temperatura={temperaturaCalefaccion} />
      <h2>Salita</h2>
    </div>
  );
}

export default Salita;
