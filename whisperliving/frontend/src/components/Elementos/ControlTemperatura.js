import React from 'react';
import '../../public/css/ControlTemperatura.css';

const ControlTemperatura = ({ titulo, temperatura }) => {
  return (
    <div className="control-temperatura">
      <h4>{titulo}</h4>
      <h4>{temperatura} ºC</h4>
    </div>
  );
};

export default ControlTemperatura;