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
    });
    return () => {
      socket.off('transcription');
    };
  }, []);

  return (
    <div className="casa-domotica">
      <SegundoPiso />
      <PlantaBaja />
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
              <source src={audioUrl} type="audio/wav" />
              Su navegador no soporta el elemento de audio.
            </audio>
            <a href={audioUrl} download="grabacion.wav">Descargar audio</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CasaDomotica;
