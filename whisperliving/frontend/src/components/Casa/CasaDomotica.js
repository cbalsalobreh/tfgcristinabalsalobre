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
  const [luzPrincipal, setLuzPrincipal] = useState(true);
  const [luzCocina, setLuzCocina] = useState(true);
  const [luzSalon, setLuzSalon] = useState(true);
  const [luzCuarto1, setLuzCuarto1] = useState(true);
  const [luzCuarto2, setLuzCuarto2] = useState(true);
  const [luzSalita, setLuzSalita] = useState(true);
  const [luzLampara, setLuzLampara] = useState(true);
  const [temperaturaAire, setTemperaturaAire] = useState(null);
  const [temperaturaCalefaccion, setTemperaturaCalefaccion] = useState(null);
  const [temperaturaNevera, setTemperaturaNevera] = useState(null);
  const [temperaturaCongelador, setTemperaturaCongelador] = useState(null);
  const [tvEstado, setTvEstado] = useState('Apagada');
  const [tvCanal, setTvCanal] = useState('');
  const [listaReproduccionCuarto1, setListaReproduccionCuarto1] = useState('');
  const [listaReproduccionCuarto2, setListaReproduccionCuarto2] = useState('');
  const [persianaPosicion, setPersianaPosicion] = useState(62);
  const [riego, setRiego] = useState(false);
  const [toldoPosicion, setToldoPosicion] = useState(100);


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
      
      // Control de temperaturas
      if (data.toLowerCase().includes('temperatura aire')) {
        const temperatura = obtenerTemperatura(data);
        setTemperaturaAire(temperatura);
      } else if (data.toLowerCase().includes('temperatura calefacción')) {
        const temperatura = obtenerTemperatura(data);
        setTemperaturaCalefaccion(temperatura);
      } else if (data.toLowerCase().includes('temperatura nevera')){
        const temperatura = obtenerTemperatura(data);
        setTemperaturaNevera(temperatura);
      } else if (data.toLowerCase().includes('temperatura congelador menos')){
        const temperatura = obtenerTemperatura(data);
        setTemperaturaCongelador(temperatura);
      }

      // Encender o apagar luces
      if (data.toLowerCase().includes('encender luz principal')) {
        setLuzPrincipal(true);
      } else if (data.toLowerCase().includes('apagar luz principal')) {
        setLuzPrincipal(false);
      }
      if (data.toLowerCase().includes('encender luz cocina')) {
        setLuzCocina(true);
      } else if (data.toLowerCase().includes('apagar luz cocina')) {
        setLuzCocina(false);
      }
      if (data.toLowerCase().includes('encender luz salón')) {
        setLuzSalon(true);
      } else if (data.toLowerCase().includes('apagar luz salón')) {
        setLuzSalon(false);
      }
      if (data.toLowerCase().includes('encender luz salita')) {
        setLuzSalita(true);
      } else if (data.toLowerCase().includes('apagar luz salita')) {
        setLuzSalita(false);
      }
      if (data.toLowerCase().includes('encender luz cuarto uno')) {
        setLuzCuarto1(true);
      } else if (data.toLowerCase().includes('apagar luz cuarto uno')) {
        setLuzCuarto1(false);
      }
      if (data.toLowerCase().includes('encender luz cuarto dos')) {
        setLuzCuarto2(true);
      } else if (data.toLowerCase().includes('apagar luz cuarto dos')) {
        setLuzCuarto2(false);
      }

      if (data.toLowerCase().includes('encender lampara')) {
        setLuzLampara(true);
      } else if (data.toLowerCase().includes('apagar lampara')) {
        setLuzLampara(false);
      }

      // Si se menciona "encender televisión"
      if (data.toLowerCase().includes('encender televisión')) {
        let estado = 'Encendida';
        let canal = '';

        // Obtener el canal si se menciona después de "encender televisión canal"
        const coincidencias = data.toLowerCase().match(/encender televisión canal (\d+)/);
        if (coincidencias && coincidencias.length === 2) {
          canal = parseInt(coincidencias[1]);
        }

        // Actualizar el estado de la televisión y el canal
        setTvEstado(estado);
        setTvCanal(canal);
      }

      if (data.toLowerCase().includes('apagar televisión')) {
        // Actualizar el estado de la televisión como apagada y sin canal
        setTvEstado('Apagada');
        setTvCanal('');
      }

    // Detectar el comando para reproducir lista en el cuarto 1
    if (data.toLowerCase().includes('reproducir lista') && data.toLowerCase().includes('en cuarto uno')) {
      const lista = obtenerLista(data);
      if (lista) {
        setListaReproduccionCuarto1(lista);
      }
    }
    
    // Detectar el comando para reproducir lista en el cuarto 2
    if (data.toLowerCase().includes('reproducir lista') && data.toLowerCase().includes('en cuarto dos')) {
      const lista = obtenerLista(data);
      if (lista) {
        setListaReproduccionCuarto2(lista);
      }
    }
    
    // Activar/desactivar riego
    if (data.toLowerCase().includes('activar riego')){
      setRiego(true);
    } 
      
    if (data.toLowerCase().includes('desactivar riego')){
      setRiego(false);
    }

    if (data.toLowerCase().includes('recoger toldo')) {
      setToldoPosicion(0);
    }

    if (data.toLowerCase().includes('sacar un poco el toldo')) {
      setToldoPosicion(25);
    }

    if (data.toLowerCase().includes('sacar toldo a la mitad')) {
      setToldoPosicion(50);
    }

    if (data.toLowerCase().includes('sacar bastante el toldo')) {
      setToldoPosicion(75);
    }

    if (data.toLowerCase().includes('sacar toldo')) {
      setToldoPosicion(100);
    }

    if (data.toLowerCase().includes('subir persiana')) {
      setPersianaPosicion(4);
    }

    if (data.toLowerCase().includes('bajar un poco la persiana')) {
      setPersianaPosicion(18);
    }

    if (data.toLowerCase().includes('bajar persiana a la mitad')) {
      setPersianaPosicion(31);
    }

    if (data.toLowerCase().includes('bajar bastante la persiana')) {
      setPersianaPosicion(45);
    }

    if (data.toLowerCase().includes('bajar persiana')) {
      setPersianaPosicion(62);
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

  // Función para obtener el nombre de la lista de reproducción del comando de voz
  const obtenerLista = (texto) => {
    const inicio = texto.toLowerCase().indexOf('reproducir lista') + 'reproducir lista'.length;
    const fin = texto.toLowerCase().indexOf('en cuarto');
    if (inicio !== -1 && fin !== -1) {
      return texto.slice(inicio, fin).trim();
    }
    return null;
  };
  

  return (
    <div className="casa-domotica">
      <SegundoPiso temperaturaAire={temperaturaAire}
        setTemperaturaAire={setTemperaturaAire}
        temperaturaCalefaccion={temperaturaCalefaccion}
        setTemperaturaCalefaccion={setTemperaturaCalefaccion}
        luzCuarto={luzCuarto1} setLuzCuarto={setLuzCuarto1} 
        listaReproduccionCuarto1={listaReproduccionCuarto1}
        setListaReproduccionCuarto1={setListaReproduccionCuarto1}
        luzCuarto2={luzCuarto2} setLuzCuarto2={setLuzCuarto2}
        listaReproduccionCuarto2={listaReproduccionCuarto2}
        setListaReproduccionCuarto2={setListaReproduccionCuarto2}
        luzSalita={luzSalita} setLuzSalita={setLuzSalita}/>
      <PlantaBaja temperaturaNevera={temperaturaNevera} 
      setTemperaturaNevera={setTemperaturaNevera} 
      temperaturaCongelador={temperaturaCongelador} 
      setTemperaturaCongelador={setTemperaturaCongelador}
      luzPrincipal={luzPrincipal} setLuzPrincipal={setLuzPrincipal}
      luzLampara={luzLampara} setLuzLampara={setLuzLampara}
      luzCocina={luzCocina} setLuzCocina={setLuzCocina}
      luzSalon={luzSalon} setLuzSalon={setLuzSalon}
      persianaPosicion={persianaPosicion} setPersianaPosicion={setPersianaPosicion}
      tvEstado={tvEstado} setTvEstado={setTvEstado} tvCanal={tvCanal} setTvCanal={setTvCanal} 
      riego={riego} setRiego={setRiego}
      toldoPosicion={toldoPosicion} setToldoPosicion={setToldoPosicion}
      />
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
