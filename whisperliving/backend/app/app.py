from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_socketio import SocketIO, emit
import whisper
from flask_cors import CORS
import base64
import tempfile
import os
from urllib.request import urlopen
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('audio')
def handle_audio(audio_data):
    print("Received audio data")
    try:
        # Convertir los datos de audio de base64 a bytes
        audio_bytes = base64.b64decode(audio_data)

        # Guardar los datos de audio en un archivo temporal
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio_file:
            temp_audio_file.write(audio_bytes)
            temp_audio_file_path = temp_audio_file.name

        print("Audio guardado en archivo temporal:", temp_audio_file_path)

        # Cargar el audio desde el archivo temporal y procesarlo con Whisper
        audio = whisper.load_audio(temp_audio_file_path)
        print("Cargado audio en whisper")
        audio_model = whisper.load_model("small")
        print("Cargado whisper")
        transcript = audio_model.transcribe(audio, language='es')

        # Emitir la transcripción (o cualquier otro resultado) de vuelta al cliente
        text_transcription = transcript['text']
        texto_sin_comas = text_transcription.replace(",", "")
        socketio.emit('transcription', texto_sin_comas)
        print("Transcripción emitida al cliente:", transcript)
        # resultado = interpretar_comando(text_transcription)
        # print(resultado)

    except Exception as e:
        print(f"Error processing audio: {e}")

# def interpretar_comando(text_transcription):
#     palabras = text_transcription.split()
#     if len(palabras) < 2:
#         return {'error': 'Comando no válido'}

#     accion = palabras[0]
#     dispositivo = palabras[1]
#     lugar = palabras[2]

#     # ENCENDER Y APAGAR
#     if accion == 'Encender' or accion == 'encender' or accion == 'Apagar':
#         # LUCES
#         if dispositivo == 'luz' and lugar == 'principal.':
#             return habitacion_principal_luz()
    #     elif dispositivo == 'lampara':
    #         return habitacion_principal_lampara()
    #     elif dispositivo == 'luz' and lugar == 'salón':
    #         return salon_luz()
    #     elif dispositivo == 'luz' and lugar == 'cocina':
    #         return cocina_luz()
    #     elif dispositivo == 'luz' and lugar == 'cuarto 1':
    #         return cuarto1_luz()
    #     elif dispositivo == 'luz' and lugar == 'cuarto 2':
    #         return cuarto2_luz()
    #     elif dispositivo == 'luz' and lugar == 'salita':
    #         return salita_luz()
        
    #     # ELECTRODOMESTICOS
    #     elif dispositivo == 'aire':
    #         return salita_aire()
    #     elif dispositivo == 'calefaccion':
    #         return salita_calefaccion()
        
    # elif accion == 'Temperatura':
    #     if dispositivo == 'nevera':
    #         return cocina_nevera()
    #     elif dispositivo == 'congelador':
    #         return cocina_congelador()

    # elif accion == 'Activar' or accion == 'Desactivar':
    #     return jardin_riego()

    # elif accion == 'Subir' or accion == 'Bajar':
    #     if dispositivo == 'persiana':
    #         return salon_persiana()
    #     elif dispositivo == 'toldo':
    #         return jardin_toldo()
        
    # elif accion == 'Echar' or accion == 'Recoger':
    #     return jardin_toldo()
        

    # Si ninguna condición coincide, devolver un error
    return {'error': 'Comando no válido'}


# Estado inicial de los componentes
components_state = {
    'habitacion_principal': {
        'luz_de_techo': 'apagada',
        'lampara': 'apagada'
    },
    'salon': {
        'luz_de_techo': 'apagada',
        'television': {'encendida': False, 'canal': 0},
        'persiana' : 'bajada'
    },
    'salita': {
        'luz_de_techo': 'apagada',
        'aire_acondicionado': {'encendido': False, 'temperatura': 0},
        'calefaccion': {'encendida': False, 'temperatura': 0}
    },
    'cocina': {
        'luz_de_techo': 'apagada',
        'congelador': {'temperatura': 0},
        'nevera': {'temperatura': 0}
    },
    'cuarto_1': {
        'luz_de_techo': 'apagada'
    },
    'cuarto_2': {
        'luz_de_techo': 'apagada'
    },
    'jardin': {
        'toldo': 'guardado',
        'riego': 'desactivado'
    }
}

# Rutas para la habitación principal
@socketio.on('accion_luz_habitacion_principal')
def habitacion_principal_luz():
    # Cambiar el estado de la luz de techo
    current_state = components_state['habitacion_principal']['luz_de_techo']
    new_state = 'encendida' if current_state == 'apagada' else 'apagada'
    print("Nuevo estado de luz")
    components_state['habitacion_principal']['luz_de_techo'] = new_state

    # Emitir el estado de la luz de techo a través de Socket.IO
    socketio.emit('estado_luz_habitacion_principal', new_state)
    print("Nuevo estado de luz enviado a frontend")

    # Devolver el nuevo estado de la luz de techo
    return jsonify({'estado': new_state})

@app.route('/casa-domotica/habitacion-principal/lampara', methods=['POST'])
def habitacion_principal_lampara():
    pass
        
@app.route('/casa-domotica/habitacion-principal/persiana', methods=['POST'])
def habitacion_principal_persiana():
    pass

# Rutas para el salón
@app.route('/casa-domotica/salon/luz', methods=['POST'])
def salon_luz():
    pass

@app.route('/casa-domotica/salon/television', methods=['POST'])
def salon_television():
    pass
        
# Rutas para la cocina
@app.route('/casa-domotica/cocina/luz', methods=['POST'])
def cocina_luz():
    pass

@app.route('/casa-domotica/cocina/nevera', methods=['POST'])
def cocina_nevera():
    pass

@app.route('/casa-domotica/cocina/congelador', methods=['POST'])
def cocina_congelador():
    pass

# Rutas para Cuarto 1
@app.route('/casa-domotica/cuarto-1/luz', methods=['POST'])
def cuarto1_luz():
    pass

@app.route('/casa-domotica/cuarto-1/reproductor-musica', methods=['POST'])
def cuarto1_reproductor():
    pass

# Rutas para Cuarto 2
@app.route('/casa-domotica/cuarto-2/luz', methods=['POST'])
def cuarto2_luz():
    pass

@app.route('/casa-domotica/cuarto-2/reproductor-musica', methods=['POST'])
def cuarto2_reproductor():
    pass

# Rutas para Salita
@app.route('/casa-domotica/salita/luz', methods=['POST'])
def salita_luz():
    pass

@app.route('/casa-domotica/salita/aire-acondicionado', methods=['POST'])
def salita_aire():
    pass

@app.route('/casa-domotica/salita/calefaccion', methods=['POST'])
def salita_calefaccion():
    pass

# Rutas para Jardín
@app.route('/casa-domotica/jardin/toldo', methods=['POST'])
def jardin_toldo():
    pass

@app.route('/casa-domotica/jardin/riego', methods=['POST'])
def jardin_riego():
    pass

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5001)
