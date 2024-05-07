import React from 'react';
import '../../public/css/Alarma.css';

const Alarma = ({ alarma }) => {
  return (
    <div className="alarma">
      <h4>Alarma de la Casa</h4>
      <h4>{alarma}</h4>
    </div>
  );
};

export default Alarma;