import React from 'react';
import LuzDeTechoEncendida from '../Elementos/LuzDeTechoEncendida';
import LuzDeTechoApagada from '../Elementos/LuzDeTechoApagada';
import Lampara from '../Elementos/Lampara';
import '../../public/css/HabitacionPrincipal.css';

const HabitacionPrincipal = ({ luzPrincipal }) => {
  return (
    <div className="habitacion-principal">
      { luzPrincipal ? <LuzDeTechoEncendida /> : <LuzDeTechoApagada /> }
      <Lampara />
      <h2>Habitación Principal</h2>
    </div>
  );
}

export default HabitacionPrincipal;
