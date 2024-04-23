import React from 'react';
import '../../public/css/Television.css'

const Television = ({ estado, canal }) => {
  return (
    <div className="television">
      <h5>Televisión</h5>
      <p>Estado: {estado}</p>
      <p>Canal: {canal}</p>
    </div>
  );
};

export default Television;
