import React from 'react';
import '../../public/css/Persiana.css';

const Persiana = ({posicion}) => {
  return (
    <div className="persiana" style={{ height: `${posicion}%`}}>
      <h5>Persiana</h5>
    </div>
  );
};

export default Persiana;
