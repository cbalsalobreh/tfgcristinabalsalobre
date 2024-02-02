import React from 'react';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import Television from '../Elementos/Television';
import Persiana from '../Elementos/Persiana';
import '../../public/css/Salon.css'

function Salon() {
  return (
    <div className="salon">
      <h2>Salón</h2>
      <LuzDeTecho />
      <Television />
      <Persiana />
    </div>
  );
}

export default Salon;
