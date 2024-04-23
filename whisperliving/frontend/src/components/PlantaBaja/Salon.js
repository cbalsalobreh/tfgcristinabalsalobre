import React from 'react';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import Television from '../Elementos/Television';
import Persiana from '../Elementos/Persiana';
import '../../public/css/Salon.css'

const Salon = ({ tvEstado, setTvEstado, tvCanal, setTvCanal }) => {
  return (
    <div className="salon">
      <LuzDeTecho />
      <Television estado={tvEstado} setEstado={setTvEstado} canal={tvCanal} setCanal={setTvCanal} />
      <Persiana />
      <h2>Salón</h2>
    </div>
  );
}

export default Salon;
