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
  tvEstado, setTvEstado, tvCanal, setTvCanal, 
  luzPrincipal, setLuzPrincipal,
  luzCocina, setLuzCocina,
  luzSalon, setLuzSalon,
  luzLampara, setLuzLampara,
  riego, setRiego,
  toldoPosicion, setToldoPosicion,
  persianaPosicion, setPersianaPosicion 
}) => {
  return (
    <div className="planta-baja">
      <div className="salon">
        <Salon tvEstado={tvEstado} setTvEstado={setTvEstado} 
        tvCanal={tvCanal} setTvCanal={setTvCanal} 
        luzSalon={luzSalon} setLuzSalon={setLuzSalon}
        persianaPosicion={persianaPosicion} setPersianaPosicion={setPersianaPosicion}/>
      </div>
      <div className="cocina">
        <Cocina temperaturaNevera={temperaturaNevera}
        setTemperaturaNevera={setTemperaturaNevera}
        temperaturaCongelador={temperaturaCongelador}
        setTemperaturaCongelador={setTemperaturaCongelador}
        luzCocina={luzCocina} setLuzCocina={setLuzCocina}/>
      </div>
      <div className="habitacion-principal">
        <HabitacionPrincipal luzPrincipal={luzPrincipal} setLuzPrincipal={setLuzPrincipal}
        luzLampara={luzLampara} setLuzLampara={setLuzLampara}/>
      </div>
      <div className='jardin'>
        <Jardin riego={riego} setRiego={setRiego} 
        toldoPosicion={toldoPosicion} setToldoPosicion={setToldoPosicion}/>
      </div>
    </div>
  );
}

export default PlantaBaja;
