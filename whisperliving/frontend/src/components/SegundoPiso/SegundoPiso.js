import React from 'react';
import Cuarto from './Cuarto';
import Salita from './Salita';
import '../../public/css/SegundoPiso.css';

function SegundoPiso() {
  return (
    <div className="segundo-piso">
      <div className="cuarto1">
        <Cuarto numero="1" />
      </div>
      <div className="cuarto2">
        <Cuarto numero="2" />
      </div>
      <div className="salita">
        <Salita />
      </div>
    </div>
  );
}

export default SegundoPiso;
