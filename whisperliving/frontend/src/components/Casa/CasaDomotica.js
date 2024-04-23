import React, { useState, useEffect } from 'react';
import PlantaBaja from '../PlantaBaja/PlantaBaja';
import SegundoPiso from '../SegundoPiso/SegundoPiso';
import '../../public/css/CasaDomotica.css';
import socketIOClient from 'socket.io-client';
import { useAudioRecorder } from 'react-audio-voice-recorder';

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
  const [luzPrincipalEncendida, setLuzPrincipalEncendida] = useState(false);
  const [temperaturaAire, setTemperaturaAire] = useState(null);
  const [temperaturaCalefaccion, setTemperaturaCalefaccion] = useState(null);
  const [temperaturaNevera, setTemperaturaNevera] = useState(null);
  const [temperaturaCongelador, setTemperaturaCongelador] = useState(null);
  const [tvEstado, setTvEstado] = useState('Apagada');
  const [tvCanal, setTvCanal] = useState('');


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
    socket.on('transcription', (data) => {
      setTranscription(data);
      
      // Determinar si el texto menciona la temperatura del aire
      if (data.toLowerCase().includes('temperatura aire')) {
        const temperatura = obtenerTemperatura(data);
        setTemperaturaAire(temperatura);
      } 
      
      // Determinar si el texto menciona la temperatura de la calefacción
      else if (data.toLowerCase().includes('temperatura calefacción')) {
        const temperatura = obtenerTemperatura(data);
        setTemperaturaCalefaccion(temperatura);
      }

      else if (data.toLowerCase().includes('temperatura nevera')){
        const temperatura = obtenerTemperatura(data);
        setTemperaturaNevera(temperatura);
      }

      else if (data.toLowerCase().includes('temperatura congelador menos')){
        const temperatura = obtenerTemperatura(data);
        setTemperaturaCongelador(temperatura);
      }

      // Determinar si el texto menciona encender o apagar la luz principal
      if (data.toLowerCase().includes('encender luz principal')) {
        setLuzPrincipalEncendida(true);
      } else if (data.toLowerCase().includes('apagar luz principal')) {
        setLuzPrincipalEncendida(false);
      }

      // Si se menciona "encender televisión"
      if (data.toLowerCase().includes('encender televisión')) {
        let estado = 'Encendida';
        let canal = '';

        // Obtener el canal si se menciona después de "encender televisión"
        const coincidencias = data.toLowerCase().match(/encender televisión canal (\d+)/);
        if (coincidencias && coincidencias.length === 2) {
          canal = parseInt(coincidencias[1]);
        }

        // Actualizar el estado de la televisión y el canal
        setTvEstado(estado);
        setTvCanal(canal);
      }

      // Si se menciona "apagar televisión"
      if (data.toLowerCase().includes('apagar televisión')) {
        // Actualizar el estado de la televisión como apagada y sin canal
        setTvEstado('Apagada');
        setTvCanal('');
      }
    });
    return () => {
      socket.off('transcription');
    };
  }, []);

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
  
  
  
  
  



  return (
    <div className="casa-domotica">
      <SegundoPiso temperaturaAire={temperaturaAire}
        setTemperaturaAire={setTemperaturaAire}
        temperaturaCalefaccion={temperaturaCalefaccion}
        setTemperaturaCalefaccion={setTemperaturaCalefaccion}
        luzPrincipalEncendida={luzPrincipalEncendida}/>
      <PlantaBaja temperaturaNevera={temperaturaNevera} 
      setTemperaturaNevera={setTemperaturaNevera} 
      temperaturaCongelador={temperaturaCongelador} 
      setTemperaturaCongelador={setTemperaturaCongelador}
      luzPrincipalEncendida={luzPrincipalEncendida} 
      tvEstado={tvEstado} setTvEstado={setTvEstado} tvCanal={tvCanal} setTvCanal={setTvCanal} />
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
