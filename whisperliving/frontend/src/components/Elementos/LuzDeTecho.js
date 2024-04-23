import React from 'react';
import PropTypes from 'prop-types';
import '../../public/css/LuzDeTecho.css';

const LuzDeTecho = ({ encendida }) => {
    return (
        <div className={encendida ? "luz-de-techo luz-encendida" : "luz-de-techo luz-apagada"}>
            <h5>Luz de Techo</h5>
        </div>
    );
};

LuzDeTecho.propTypes = {
    encendida: PropTypes.bool.isRequired
};

export default LuzDeTecho;