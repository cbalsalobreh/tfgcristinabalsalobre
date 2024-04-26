import React from 'react';
import Toldo from '../Elementos/Toldo';
import Riego from '../Elementos/Riego';
import '../../public/css/Jardin.css'

const Jardin = ({riego, toldoPosicion}) => {
  return (
    <div className="jardin">
        <Toldo posicion={toldoPosicion}/> 
        <div className="suelo">
            <div className="florecita"></div>
            <div className="florecita2"></div>
            <div className="florecita"></div>
            <div className="florecita2"></div>
            <div className="florecita"></div>
            <div className="florecita2"></div>
            <div className="florecita"></div>
            <div className="florecita2"></div>
            <div className="florecita"></div>
            <div className="florecita2"></div>
            <div className="florecita"></div>
            <div className="florecita2"></div>
        </div>
        {riego && <Riego />}
    </div>
  );
}

export default Jardin;
