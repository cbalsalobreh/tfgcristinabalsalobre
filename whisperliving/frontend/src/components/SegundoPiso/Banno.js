import React from 'react';
import '../../public/css/Banno.css';
import LuzDeTechoApagada from '../Elementos/LuzDeTechoApagada';
import LuzDeTechoEncendida from '../Elementos/LuzDeTechoEncendida';
import Ducha from '../Elementos/Ducha';

function Banno({ luzBanno, ducha }) {
  return (
    <div className="banno">
      { luzBanno ? <LuzDeTechoEncendida /> : <LuzDeTechoApagada /> }
      <h2>Baño</h2>
      <div className="shower">
        <div className="head"></div>
        <div className="pipe"></div>
        <div className="base"></div>
      </div>
      {ducha && <Ducha />}
    </div>
  );
}

export default Banno;