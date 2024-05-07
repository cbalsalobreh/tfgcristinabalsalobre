import React, { useState, useEffect } from 'react';
import PlantaBaja from '../PlantaBaja/PlantaBaja';
import SegundoPiso from '../SegundoPiso/SegundoPiso';
import '../../public/css/CasaDomotica.css';
import socketIOClient from 'socket.io-client';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { useNavigate } from 'react-router-dom';


const ENDPOINT = 'http://localhost:5001';
const socket = socketIOClient(ENDPOINT);

const CasaDomotica = () => {
  const {
    startRecording,
    stopRecording,
    isRecording,
    recordingBlob
  } = useAudioRecorder();

  const [transcription, setTranscription] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const navigate = useNavigate();
  const [deviceStates, setDeviceStates] = useState({
    luzPrincipal: true,
    luzCocina: true,
    luzSalon: true,
    luzCuarto1: true,
    luzCuarto2: true,
    luzSalita: true,
    luzLampara: true,
    luzBanno: true,
    temperaturaAire: null,
    temperaturaCalefaccion: null,
    temperaturaNevera: null,
    temperaturaCongelador: null,
    tvEstado: 'Apagada',
    tvCanal: '',
    listaReproduccionCuarto1: '',
    listaReproduccionCuarto2: '',
    persianaPosicion: 62,
    riego: false,
    toldoPosicion: 100,
    ducha: false
  });

  const handleLogout = () => {
    // Eliminar datos de inicio de sesión del almacenamiento local
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/');
  };

  useEffect(() => {
    if (recordingBlob) {
      const reader = new FileReader();
      reader.readAsDataURL(recordingBlob);
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        socket.emit('audio', base64Data);
        setAudioUrl(URL.createObjectURL(recordingBlob)); // Mostrar audio en el cliente
      };
    }
  }, [recordingBlob]);

  useEffect(() => {
    const handleTranscription = (data) => {
      setTranscription(data);
      updateDeviceStates(data);
    };

    const updateDeviceStates = (data) => {
      updateTemperatures(data);
      updateLightStates(data);
      updateTelevisionState(data);
      updateMusicLists(data);
      updateRiego(data);
      updateToldoPosicion(data);
      updatePersianaPosicion(data);
      updateDucha(data);
    };
  
    const updateTemperatures = (data) => {
      if (data.toLowerCase().includes('temperatura aire')) {
        const temperatura = obtenerTemperatura(data);
        setDeviceStates(prevState => ({
          ...prevState,
          temperaturaAire: temperatura
        }));
      } else if (data.toLowerCase().includes('temperatura calefacción')) {
        const temperatura = obtenerTemperatura(data);
        setDeviceStates(prevState => ({
          ...prevState,
          temperaturaCalefaccion: temperatura
        }));
      } else if (data.toLowerCase().includes('temperatura nevera')) {
        const temperatura = obtenerTemperatura(data);
        setDeviceStates(prevState => ({
          ...prevState,
          temperaturaNevera: temperatura
        }));
      } else if (data.toLowerCase().includes('temperatura congelador menos')) {
        const temperatura = obtenerTemperatura(data);
        setDeviceStates(prevState => ({
          ...prevState,
          temperaturaCongelador: temperatura
        }));
      }
    };
    
    const updateLightStates = (data) => {
      const encenderKeywords = ['encender', 'enciende', 'activar', 'activa'];
      const apagarKeywords = ['apagar', 'apaga', 'desactivar', 'desactiva'];
    
      const currentLightStates = { ...deviceStates };
    
      encenderKeywords.forEach(keyword => {
        if (data.toLowerCase().includes(keyword)) {
          if (data.toLowerCase().includes('luz principal')) {
            currentLightStates.luzPrincipal = true;
          } else if (data.toLowerCase().includes('luz cocina')) {
            currentLightStates.luzCocina = true;
          } else if (data.toLowerCase().includes('luz salón')) {
            currentLightStates.luzSalon = true;
          } else if (data.toLowerCase().includes('luz cuarto uno')){
            currentLightStates.luzCuarto1 = true;
          } else if (data.toLowerCase().includes('luz cuarto dos')){
            currentLightStates.luzCuarto2 = true;
          } else if (data.toLowerCase().includes('luz salita')){
            currentLightStates.luzSalita = true;
          } else if (data.toLowerCase().includes('lámpara')){
            currentLightStates.luzLampara = true;
          } else if (data.toLowerCase().includes('luz baño')){
            currentLightStates.luzBanno = true;
          }
        }
      });
    
      apagarKeywords.forEach(keyword => {
        if (data.toLowerCase().includes(keyword)) {
          if (data.toLowerCase().includes('luz principal')) {
            currentLightStates.luzPrincipal = false;
          } else if (data.toLowerCase().includes('luz cocina')) {
            currentLightStates.luzCocina = false;
          } else if (data.toLowerCase().includes('luz salón')) {
            currentLightStates.luzSalon = false;
          } else if (data.toLowerCase().includes('luz cuarto uno')){
            currentLightStates.luzCuarto1 = false;
          } else if (data.toLowerCase().includes('luz cuarto dos')){
            currentLightStates.luzCuarto2 = false;
          } else if (data.toLowerCase().includes('luz salita')){
            currentLightStates.luzSalita = false;
          } else if (data.toLowerCase().includes('lámpara')){
            currentLightStates.luzLampara = false;
          } else if (data.toLowerCase().includes('luz baño')){
            currentLightStates.luzBanno = false;
          }
        }
      });
    
      setDeviceStates(prevState => ({
        ...prevState,
        luzPrincipal: currentLightStates.luzPrincipal,
        luzCocina: currentLightStates.luzCocina,
        luzSalon: currentLightStates.luzSalon,
        luzCuarto1: currentLightStates.luzCuarto1,
        luzCuarto2: currentLightStates.luzCuarto2,
        luzSalita: currentLightStates.luzSalita,
        luzLampara: currentLightStates.luzLampara,
        luzBanno: currentLightStates.luzBanno
      }));
    };
    
    
    const updateTelevisionState = (data) => {
      if (data.toLowerCase().includes('encender televisión')) {
        let estado = 'Encendida';
        let canal = '';
    
        // Obtener el canal si se menciona después de "encender televisión canal"
        const coincidencias = data.toLowerCase().match(/encender televisión canal (\d+)/);
        if (coincidencias && coincidencias.length === 2) {
          canal = parseInt(coincidencias[1]);
        }
    
        // Actualizar el estado de la televisión y el canal
        setDeviceStates(prevState => ({
          ...prevState,
          tvEstado: estado,
          tvCanal: canal.toString()
        }));
      } else if (data.toLowerCase().includes('apagar televisión')) {
        // Actualizar el estado de la televisión como apagada y sin canal
        setDeviceStates(prevState => ({
          ...prevState,
          tvEstado: 'Apagada',
          tvCanal: ''
        }));
      }
    };
    
    const updateMusicLists = (data) => {
      // Palabras clave para reproducir listas de reproducción en diferentes habitaciones
      const cuarto1Keywords = ['en cuarto uno', 'en el cuarto uno', 'en la habitación uno', 'en el primer cuarto'];
      const cuarto2Keywords = ['en cuarto dos', 'en el cuarto dos', 'en la habitación dos', 'en el segundo cuarto'];
    
      const currentDeviceStates = { ...deviceStates };
    
      // Actualizar la lista de reproducción del cuarto 1
      cuarto1Keywords.forEach(keyword => {
        if (data.toLowerCase().includes(keyword)) {
          const listaReproduccion = obtenerLista(data);
          if (listaReproduccion) {
            currentDeviceStates.listaReproduccionCuarto1 = listaReproduccion;
          }
        }
      });
    
      // Actualizar la lista de reproducción del cuarto 2
      cuarto2Keywords.forEach(keyword => {
        if (data.toLowerCase().includes(keyword)) {
          const listaReproduccion = obtenerLista(data);
          if (listaReproduccion) {
            currentDeviceStates.listaReproduccionCuarto2 = listaReproduccion;
          }
        }
      });
    
      // Actualizar el estado del dispositivo con las nuevas listas de reproducción
      setDeviceStates(prevState => ({
        ...prevState,
        listaReproduccionCuarto1: currentDeviceStates.listaReproduccionCuarto1,
        listaReproduccionCuarto2: currentDeviceStates.listaReproduccionCuarto2,
      }));
    };  
    
    const updateRiego = (data) => {
      const currentDeviceStates = { ...deviceStates };
    
      // Palabras clave para activar o desactivar el riego
      const activarRiegoKeywords = ['activar riego', 'encender riego', 'activar el riego', 'encender el riego'];
      const desactivarRiegoKeywords = ['desactivar riego', 'apagar riego', 'desactivar el riego', 'apagar el riego'];
    
      // Verificar si se menciona activar el riego
      activarRiegoKeywords.forEach(keyword => {
        if (data.toLowerCase().includes(keyword)) {
          currentDeviceStates.riego = true;
        }
      });
    
      // Verificar si se menciona desactivar el riego
      desactivarRiegoKeywords.forEach(keyword => {
        if (data.toLowerCase().includes(keyword)) {
          currentDeviceStates.riego = false;
        }
      });
    
      // Actualizar el estado del dispositivo con el nuevo estado del riego
      setDeviceStates(prevState => ({
        ...prevState,
        riego: currentDeviceStates.riego,
      }));
    };

    const updateDucha = (data) => {
      const currentDeviceStates = { ...deviceStates };
    
      // Palabras clave para activar o desactivar el riego
      const activarRiegoKeywords = ['activar ducha', 'encender ducha', 'activar la ducha', 'encender la ducha'];
      const desactivarRiegoKeywords = ['desactivar ducha', 'apagar ducha', 'desactivar la ducha', 'apagar la ducha'];
    
      // Verificar si se menciona activar el riego
      activarRiegoKeywords.forEach(keyword => {
        if (data.toLowerCase().includes(keyword)) {
          currentDeviceStates.ducha = true;
        }
      });
    
      // Verificar si se menciona desactivar el riego
      desactivarRiegoKeywords.forEach(keyword => {
        if (data.toLowerCase().includes(keyword)) {
          currentDeviceStates.ducha = false;
        }
      });
    
      // Actualizar el estado del dispositivo con el nuevo estado del riego
      setDeviceStates(prevState => ({
        ...prevState,
        ducha: currentDeviceStates.ducha,
      }));
    };
    
    
    const updateToldoPosicion = (data) => {
      const currentDeviceStates = { ...deviceStates };
      const posicionToldoKeywords = {
        'recoger toldo': 0,
        'sacar un poco el toldo': 25,
        'sacar mitad toldo': 50,
        'sacar bastante el toldo': 75,
        'sacar toldo': 100
      };
    
      // Verificar si alguna palabra clave coincide con el comando de voz
      Object.entries(posicionToldoKeywords).forEach(([keyword, posicion]) => {
        if (data.toLowerCase().includes(keyword)) {
          currentDeviceStates.toldoPosicion = posicion;
        }
      });
    
      // Actualizar el estado del dispositivo con la nueva posición del toldo
      setDeviceStates(prevState => ({
        ...prevState,
        toldoPosicion: currentDeviceStates.toldoPosicion,
      }));
    };
    
    
    const updatePersianaPosicion = (data) => {
      const currentDeviceStates = { ...deviceStates };
      // Palabras clave para actualizar la posición de la persiana
      const posicionPersianaKeywords = {
        'subir persiana': 4,
        'bajar un poco la persiana': 18,
        'bajar persiana a la mitad': 31,
        'bajar bastante la persiana': 45,
        'bajar persiana': 62
      };
    
      // Verificar si alguna palabra clave coincide con el comando de voz
      Object.entries(posicionPersianaKeywords).forEach(([keyword, posicion]) => {
        if (data.toLowerCase().includes(keyword)) {
          currentDeviceStates.persianaPosicion = posicion;
        }
      });
    
      // Actualizar el estado del dispositivo con la nueva posición de la persiana
      setDeviceStates(prevState => ({
        ...prevState,
        persianaPosicion: currentDeviceStates.persianaPosicion,
      }));
    };
    
    
  
    // Función para obtener la temperatura de un texto
    const obtenerTemperatura = (texto) => {
      const patron = /(?:menos\s)?(\d+)\s*(?:grados|ºC)/;
      const coincidencias = texto.match(patron);
      if (coincidencias && coincidencias.length === 2) {
        const temperatura = parseInt(coincidencias[1]);
        return isNaN(temperatura) ? null : (texto.includes("menos") ? `-${temperatura}` : temperatura);
      } else {
        return null;
      }
    };
  
    // Función para obtener el nombre de la lista de reproducción del comando de voz
    const obtenerLista = (texto) => {
      const inicio = texto.toLowerCase().indexOf('reproducir lista') + 'reproducir lista'.length;
      const fin = texto.toLowerCase().indexOf('en cuarto');
      if (inicio !== -1 && fin !== -1) {
        return texto.slice(inicio, fin).trim();
      }
      return null;
    };

    socket.on('transcription', handleTranscription);

    return () => {
      socket.off('transcription', handleTranscription);
    };
  }, [deviceStates]);
  

  return (
    <div className="casa-domotica">
      <div className="logout-button-container">
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <SegundoPiso {...deviceStates} setDeviceStates={setDeviceStates} />
      <PlantaBaja {...deviceStates} setDeviceStates={setDeviceStates} />
      <div>
        {isRecording && <p>Grabando...</p>}
        {!isRecording && <p>Listo para grabar</p>}
        <button onClick={startRecording} disabled={isRecording}>
          Iniciar Grabación
        </button>
        {isRecording && (
          <button onClick={stopRecording}>Detener Grabación</button>
        )}
        <p>Transcripción: {transcription}</p>
        {audioUrl && (
          <div>
            <audio controls>
              <source src={audioUrl}/>
              Su navegador no soporta el elemento de audio.
            </audio>
            <a href={audioUrl}>Descargar audio</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CasaDomotica;
