import React, { useState, useEffect } from 'react';
import PlantaBaja from '../PlantaBaja/PlantaBaja';
import SegundoPiso from '../SegundoPiso/SegundoPiso';
import '../../public/css/CasaDomotica.css';
import socketIOClient from 'socket.io-client';
import RecordRTC from 'recordrtc';

const ENDPOINT = 'http://localhost:5001';  // La URL de tu servidor Flask
const socket = socketIOClient(ENDPOINT);

function CasaDomotica() {
    const [transcript, setTranscript] = useState('');
    const [recording, setRecording] = useState(false); // Estado para controlar la grabación
    const [error, setError] = useState(''); // Estado para manejar errores
    const [recorder, setRecorder] = useState(null); // Grabador de audio

    useEffect(() => {
        // Inicializar el grabador
        const recordRTC = RecordRTC({
            type: 'audio',
            mimeType: 'audio/wav',
            recorderType: StereoAudioRecorder
        });

        setRecorder(recordRTC);

        socket.on('transcription', (data) => {
            setTranscript(data);
        });
    }, []);

    const startRecording = async () => {
        try {
            setError(''); // Limpiar mensaje de error antes de iniciar la grabación

            if (!recorder) return;

            // Iniciar la grabación
            recorder.startRecording();

            setRecording(true); // Indicar que la grabación está en curso

            setTimeout(() => {
                // Detener la grabación
                recorder.stopRecording(() => {
                    setRecording(false); // Indicar que la grabación ha terminado

                    // Obtener el archivo de audio
                    const audioBlob = recorder.getBlob();

                    const reader = new FileReader();
                    reader.onload = async () => {
                        const base64Data = reader.result.split(',')[1];
                        console.log(base64Data);
                        socket.emit('audio', base64Data);
                    };
                    reader.readAsDataURL(audioBlob);
                });
            }, 10000); // Duración máxima de grabación: 10 segundos
        } catch (error) {
            setError('Error al grabar: ' + error.message); // Mostrar mensaje de error
            console.error('Error:', error);
        }
    };

    const stopRecording = () => {
        if (!recorder) return;

        // Detener la grabación si el usuario lo solicita
        recorder.stopRecording(() => {
            setRecording(false);
        });
    };

    const clearTranscript = () => {
        setTranscript(''); // Limpiar la transcripción
    };

    return (
        <div className="casa-domotica">
            <h1>Casa Domótica</h1>
            <SegundoPiso />
            <PlantaBaja />
            {recording ? ( // Mostrar el botón para detener la grabación si está en curso
                <button onClick={stopRecording}>Detener Grabación</button>
            ) : (
                <button onClick={startRecording}>Iniciar Grabación</button> // Mostrar el botón para iniciar la grabación si no está en curso
            )}
            {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error si existe */}
            <p>Transcripción: {transcript}</p>
            <button onClick={clearTranscript}>Limpiar Transcripción</button>
        </div>
    );
}

export default CasaDomotica;
