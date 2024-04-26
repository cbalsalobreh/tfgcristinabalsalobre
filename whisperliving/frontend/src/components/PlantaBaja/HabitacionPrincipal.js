import React from 'react';
import LuzDeTechoEncendida from '../Elementos/LuzDeTechoEncendida';
import LuzDeTechoApagada from '../Elementos/LuzDeTechoApagada';
import LamparaApagada from '../Elementos/LamparaApagada';
import LamparaEncendida from '../Elementos/LamparaEncendida';

import '../../public/css/HabitacionPrincipal.css';

const HabitacionPrincipal = ({ luzPrincipal, luzLampara }) => {
  return (
    <div className="habitacion-principal">
      { luzPrincipal ? <LuzDeTechoEncendida /> : <LuzDeTechoApagada /> }
      <h2>Habitación Principal</h2>
      {luzLampara ? <LamparaEncendida /> : <LamparaApagada />}
    </div>
  );
}

export default HabitacionPrincipal;
