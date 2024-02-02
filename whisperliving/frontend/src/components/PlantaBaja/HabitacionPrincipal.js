import React from 'react';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import Lampara from '../Elementos/Lampara';
import '../../public/css/HabitacionPrincipal.css'

function HabitacionPrincipal() {
  return (
    <div className="habitacion-principal">
      <h2>Habitación Principal</h2>
      <LuzDeTecho />
      <Lampara />
    </div>
  );
}

export default HabitacionPrincipal;
