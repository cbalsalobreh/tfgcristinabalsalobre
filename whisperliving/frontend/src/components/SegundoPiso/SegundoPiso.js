import React from 'react';
import Cuarto from './Cuarto';
import Salita from './Salita';
import '../../public/css/SegundoPiso.css';

const SegundoPiso = ({
  temperaturaAire,
  setTemperaturaAire,
  temperaturaCalefaccion,
  setTemperaturaCalefaccion
}) => {
  return (
    <div className="segundo-piso">
      <div className="cuarto1">
        <Cuarto numero="1" />
      </div>
      <div className="cuarto2">
        <Cuarto numero="2" />
      </div>
      <div className="salita">
        <Salita temperaturaAire={temperaturaAire}
        setTemperaturaAire={setTemperaturaAire}
        temperaturaCalefaccion={temperaturaCalefaccion}
        setTemperaturaCalefaccion={setTemperaturaCalefaccion}/>
      </div>
    </div>
  );
}

export default SegundoPiso;
