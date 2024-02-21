import React from 'react';
import Toldo from '../Elementos/Toldo';
import Riego from '../Elementos/Riego';
import '../../public/css/Jardin.css'

function Jardin() {
  return (
    <div className="jardin">
        <Toldo /> 
        <div className="suelo">
            <div className="florecita"></div>
            <div className="florecita"></div>
            <div className="florecita"></div>
            <div className="florecita"></div>
            <div className="florecita"></div>
        </div>
        <Riego />  
    </div>
  );
}

export default Jardin;
