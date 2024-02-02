import React from 'react';
import HabitacionPrincipal from './HabitacionPrincipal';
import Cocina from './Cocina';
import Salon from './Salon';
import '../../public/css/PlantaBaja.css';

function PlantaBaja() {
  return (
    <div className="planta-baja">
      <div className="habitacion-principal">
        <HabitacionPrincipal />
      </div>
      <div className="cocina">
        <Cocina />
      </div>
      <div className="salon">
        <Salon />
      </div>
    </div>
  );
}

export default PlantaBaja;
