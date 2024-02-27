import React from 'react';
import PlantaBaja from '../PlantaBaja/PlantaBaja';
import SegundoPiso from '../SegundoPiso/SegundoPiso';
//import './CasaDomotica.css';

function CasaDomotica() {
    return (
        <div className="casa-domotica">
            <h1>Casa Domótica</h1>
            <SegundoPiso />
            <PlantaBaja />
        </div>
    );
}

export default CasaDomotica;