import React from 'react';
import HabitacionPrincipal from './HabitacionPrincipal';
import Cocina from './Cocina';
import Salon from './Salon';
import Jardin from './Jardin';
import '../../public/css/PlantaBaja.css';

const PlantaBaja = ({ 
  temperaturaNevera,
  setTemperaturaNevera,
  temperaturaCongelador,
  setTemperaturaCongelador,
  luzPrincipalEncendida }) => {
  return (
    <div className="planta-baja">
      <div className="salon">
        <Salon />
      </div>
      <div className="cocina">
        <Cocina temperaturaNevera={temperaturaNevera}
        setTemperaturaNevera={setTemperaturaNevera}
        temperaturaCongelador={temperaturaCongelador}
        setTemperaturaCongelador={setTemperaturaCongelador}/>
      </div>
      <div className="habitacion-principal">
        <HabitacionPrincipal luzPrincipalEncendida={luzPrincipalEncendida} />
      </div>
      <div className='jardin'>
        <Jardin />
      </div>
    </div>
  );
}

export default PlantaBaja;
