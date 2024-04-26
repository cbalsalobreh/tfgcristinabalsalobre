import React from 'react';
import '../../public/css/Toldo.css';

const Toldo = ({posicion}) => {
  return (
    <div className="toldo" style={{ width: `${posicion}%`}}>
    </div>
  );
};

export default Toldo;
