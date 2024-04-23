import React from 'react';
import '../../public/css/Cuarto.css';
import LuzDeTecho from '../Elementos/LuzDeTecho';
import ReproductorMusica from '../Elementos/ReproductorMusica';


function Cuarto() {
  return (
    <div className="cuarto">
      <LuzDeTecho encendida={false}/>
      <ReproductorMusica />
      <h2>Cuarto</h2>
    </div>
  );
}

export default Cuarto;