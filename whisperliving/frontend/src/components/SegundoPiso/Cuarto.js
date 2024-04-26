import React from 'react';
import '../../public/css/Cuarto.css';
import LuzDeTechoEncendida from '../Elementos/LuzDeTechoEncendida';
import LuzDeTechoApagada from '../Elementos/LuzDeTechoApagada';
import ReproductorMusica from '../Elementos/ReproductorMusica';


const Cuarto = ({numero, luzCuarto, listaReproduccion, setListaReproduccion}) => {
  return (
    <div className={`cuarto cuarto${numero}`}>
      { luzCuarto ? <LuzDeTechoEncendida /> : <LuzDeTechoApagada /> }
      <ReproductorMusica nombreListaReproduccion={listaReproduccion}
      setNombreListaReproduccion={setListaReproduccion}/>
      <h2>Cuarto {numero}</h2>
    </div>
  );
}

export default Cuarto;