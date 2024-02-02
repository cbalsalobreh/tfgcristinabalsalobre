// ControlTemperatura.js
import React from 'react';

const ControlTemperatura = () => {
  return (
    <div className="control-temperatura">
      <h3>Control de Temperatura</h3>
      <p>Temperatura Actual: 22°C</p>
      <p>Ajuste de Temperatura: 20°C</p>
      <input type="range" min="10" max="30" value="20" disabled />
    </div>
  );
};

export default ControlTemperatura;
