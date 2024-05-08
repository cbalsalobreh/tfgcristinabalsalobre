from flask import Flask, jsonify, request, render_template, redirect, url_for, session
from flask_session import Session
from flask_socketio import SocketIO, emit, disconnect
import sqlite3
import whisper
from flask_cors import CORS
import base64
import tempfile
from urllib.request import urlopen
from flask_wtf.csrf import generate_csrf

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['SESSION_TYPE'] = 'filesystem' 
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)
Session(app)

audio_model = whisper.load_model("small")
print("Cargado whisper")

@socketio.on('connect')
def handle_connect():
    try:
        csrf_token = request.args.get('csrf_token')
        # Validar el token CSRF recibido desde el cliente
        if csrf_token == session.get('csrf_token'):
            print("Token CSRF válido:", csrf_token)
            # Realizar otras operaciones después de la validación del token CSRF
        else:
            print("Token CSRF inválido:", csrf_token)
            # Desconectar al cliente u otra acción en caso de token CSRF inválido
            disconnect()
    except Exception as e:
        print("Error al manejar la conexión:", e)

@socketio.on('audio')
def handle_audio(audio_data):
    print("Audio recibido")
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
        transcript = audio_model.transcribe(audio, language='es')

        # Emitir la transcripción (o cualquier otro resultado) de vuelta al cliente
        text_transcription = transcript['text']
        texto_sin_comas = text_transcription.replace(",", "")
        socketio.emit('transcription', texto_sin_comas)
        print("Transcripción emitida al cliente:", transcript)

    except Exception as e:
        print(f"Error processing audio: {e}")

def save_user_to_database(username, email, password):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', (username, email, password))
    conn.commit()
    conn.close()

@socketio.on('register')
def handle_register(data):
    username = data.get('registerUsername')
    email = data.get('registerEmail')
    password = data.get('registerPassword')
    # Guardar los datos de usuario en la base de datos
    save_user_to_database(username, email, password)
    # Envía una respuesta de confirmación al cliente que originó el evento 'register'
    socketio.emit('register_response', {'message': 'Registro exitoso'})

@app.route('/')
def index():
    # Genera el token CSRF y guárdalo en la sesión
    csrf_token = generate_csrf()
    print('Token CSFR generado')
    session['csrf_token'] = csrf_token
    print('Sesión generada')
    # Devuelve el token CSRF como respuesta
    return jsonify({'csrf_token': csrf_token})

@socketio.on('login')
def handle_login(data):
    login_username = data.get('loginUsername')
    login_password = data.get('loginPassword')
    # Enviar la URL de redirección como parte de la respuesta
    redirect_url = '/casa-domotica'
    # Envía una respuesta de confirmación al cliente que originó el evento 'login', incluyendo la URL de redirección
    socketio.emit('login_response', {'message': 'Inicio de sesión exitoso', 'redirect': redirect_url})

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5001)
