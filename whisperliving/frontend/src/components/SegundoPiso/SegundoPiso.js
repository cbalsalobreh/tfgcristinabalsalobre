import React from 'react';
import Cuarto from './Cuarto';
import Salita from './Salita';
import '../../public/css/SegundoPiso.css';

const SegundoPiso = ({
  temperaturaAire, setTemperaturaAire,
  temperaturaCalefaccion, setTemperaturaCalefaccion,
  luzCuarto,listaReproduccionCuarto1,
  luzCuarto2,listaReproduccionCuarto2,
  luzSalita, setLuzSalita
}) => {
  return (
    <div className="segundo-piso">
      <div className="cuarto1">
        <Cuarto numero={1}
        luzCuarto={luzCuarto}
        listaReproduccion={listaReproduccionCuarto1}/>
      </div>
      <div className="cuarto2">
        <Cuarto numero={2} 
        luzCuarto={luzCuarto2} 
        listaReproduccion={listaReproduccionCuarto2}/>
      </div>
      <div className="salita">
        <Salita temperaturaAire={temperaturaAire}
        setTemperaturaAire={setTemperaturaAire}
        temperaturaCalefaccion={temperaturaCalefaccion}
        setTemperaturaCalefaccion={setTemperaturaCalefaccion}
        luzSalita={luzSalita} setLuzSalita={setLuzSalita}/>
      </div>
    </div>
  );
}

export default SegundoPiso;
