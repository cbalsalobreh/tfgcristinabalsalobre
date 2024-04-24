import React from 'react';
import '../../public/css/Cuarto.css';
import LuzDeTechoEncendida from '../Elementos/LuzDeTechoEncendida';
import LuzDeTechoApagada from '../Elementos/LuzDeTechoApagada';
import ReproductorMusica from '../Elementos/ReproductorMusica';


const Cuarto = ({luzCuarto}) => {
  return (
    <div className="cuarto">
      { luzCuarto ? <LuzDeTechoEncendida /> : <LuzDeTechoApagada /> }
      <ReproductorMusica />
      <h2>Cuarto</h2>
    </div>
  );
}

export default Cuarto;