import React from 'react';
import '../../public/css/ReproductorMusica.css'

const ReproductorMusica = ({nombreListaReproduccion}) => {
  return (
    <div className="reproductor-musica">
      <h5>Reproductor de Música</h5>
      <p>Lista actual: {nombreListaReproduccion}</p>
    </div>
  );
};

export default ReproductorMusica;
