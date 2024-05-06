import React from 'react';
import '../../public/css/Banno.css';
import LuzDeTechoApagada from '../Elementos/LuzDeTechoApagada';
import LuzDeTechoEncendida from '../Elementos/LuzDeTechoEncendida';
//import ControlTemperatura from '../Elementos/ControlTemperatura';

function Banno({ luzBanno }) {
  return (
    <div className="banno">
      { luzBanno ? <LuzDeTechoEncendida /> : <LuzDeTechoApagada /> }
      <h2>Baño</h2>
    </div>
  );
}

export default Banno;