import React from 'react';
import LuzDeTechoApagada from '../Elementos/LuzDeTechoApagada';
import LuzDeTechoEncendida from '../Elementos/LuzDeTechoEncendida';
import ControlTemperatura from '../Elementos/ControlTemperatura';
import '../../public/css/Cocina.css'

function Cocina({ temperaturaNevera, temperaturaCongelador, luzCocina }) {
  return (
    <div className="cocina">
      { luzCocina ? <LuzDeTechoEncendida /> : <LuzDeTechoApagada /> }
      <ControlTemperatura titulo="Nevera" temperatura={temperaturaNevera}/>
      <ControlTemperatura titulo="Congelador" temperatura={temperaturaCongelador}/>
      <h2>Cocina</h2>
    </div>
  );
}

export default Cocina;
