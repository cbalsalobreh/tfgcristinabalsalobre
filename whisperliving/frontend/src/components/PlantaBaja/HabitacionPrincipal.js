import React from 'react';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import Lampara from '../Elementos/Lampara';
import '../../public/css/HabitacionPrincipal.css';

const HabitacionPrincipal = ({ luzPrincipalEncendida }) => {
  return (
    <div className="habitacion-principal">
      <LuzDeTecho className={`luz-techo ${luzPrincipalEncendida ? 'encendida' : 'apagada'}`}/>
      <Lampara />
      <h2>Habitación Principal</h2>
    </div>
  );
}

export default HabitacionPrincipal;
