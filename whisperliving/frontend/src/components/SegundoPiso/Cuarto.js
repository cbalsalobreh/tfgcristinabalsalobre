import React from 'react';
import '../../public/css/Cuarto.css';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import ReproductorMusica from '../Elementos/ReproductorMusica';


function Salon() {
  return (
    <div className="salon">
      <h2>Salón</h2>
      <LuzDeTecho />
      <ReproductorMusica />
    </div>
  );
}

export default Salon;