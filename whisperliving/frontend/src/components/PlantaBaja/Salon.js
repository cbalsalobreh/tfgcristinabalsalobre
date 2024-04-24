import React from 'react';
import LuzDeTechoApagada from '../Elementos/LuzDeTechoApagada';
import LuzDeTechoEncendida from '../Elementos/LuzDeTechoEncendida';
import Television from '../Elementos/Television';
import Persiana from '../Elementos/Persiana';
import '../../public/css/Salon.css'

const Salon = ({ tvEstado, setTvEstado, tvCanal, setTvCanal, luzSalon }) => {
  return (
    <div className="salon">
      { luzSalon ? <LuzDeTechoEncendida /> : <LuzDeTechoApagada /> }
      <Television estado={tvEstado} setEstado={setTvEstado} canal={tvCanal} setCanal={setTvCanal} />
      <Persiana />
      <h2>Salón</h2>
    </div>
  );
}

export default Salon;
