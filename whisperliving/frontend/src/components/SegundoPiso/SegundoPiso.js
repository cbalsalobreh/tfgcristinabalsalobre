import React from 'react';
import Cuarto from './Cuarto';
import Banno from './Banno';
import Salita from './Salita';
import '../../public/css/SegundoPiso.css';

const SegundoPiso = ({
  temperaturaAire,
  temperaturaCalefaccion,
  luzCuarto1,listaReproduccionCuarto1,
  luzCuarto2,listaReproduccionCuarto2,
  luzSalita,
  luzBanno,
  ducha
}) => {
  return (
    <div className="segundo-piso">
      <div className="cuarto1">
        <Cuarto numero={1}
        luzCuarto={luzCuarto1}
        listaReproduccion={listaReproduccionCuarto1}/>
      </div>
      <div className='banno'>
        <Banno luzBanno={luzBanno} ducha={ducha}/>
      </div>
      <div className="cuarto2">
        <Cuarto numero={2} 
        luzCuarto={luzCuarto2} 
        listaReproduccion={listaReproduccionCuarto2}/>
      </div>
      <div className="salita">
        <Salita temperaturaAire={temperaturaAire}
        temperaturaCalefaccion={temperaturaCalefaccion}
        luzSalita={luzSalita}/>
      </div>
    </div>
  );
}

export default SegundoPiso;
