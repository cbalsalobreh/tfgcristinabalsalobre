from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_socketio import SocketIO, emit
import whisper
from flask_cors import CORS
import base64
import wave
import io
# from flask_sqlalchemy import SQLAlchemy
# from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
import urllib.request
from urllib.request import urlopen
import ssl
import json
ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

def clean_audio_bytes(audio_bytes):
  """
  Attempts to clean audio data and convert it to WAV format (if necessary)
  """
  try:
    with wave.open(io.BytesIO(audio_bytes), 'rb') as wav_file:
      # Check audio format (adjust based on your needs)
      if wav_file.getsampwidth() != 2:
        raise ValueError("Unsupported audio format")
      # Read frames and remove potential null bytes (optional)
      frames = wav_file.readframes(wav_file.getnframes())
      cleaned_frames = b''.join(frame for frame in frames if frame != b'\0')
      return cleaned_frames
  except wave.Error:
    # Handle WAV format error (e.g., send error message to client)
    print("Received data is not a valid WAV file")
    # Optionally, try converting to WAV format using soundfile
    # cleaned_audio_bytes = convert_to_wav(audio_bytes)  # Implement conversion logic
    return None

@socketio.on('audio')
def handle_audio(audio_data):
    audio_model = whisper.load_model("medium")  # Ruta correcta al modelo Whisper
    audio_bytes = base64.b64decode(audio_data)

    try:
        # Clean the audio data (assuming clean_audio_bytes function is implemented)
        cleaned_audio_bytes = clean_audio_bytes(audio_bytes)

        # Check if cleaned_audio_bytes is not None before using it
        if cleaned_audio_bytes is not None:
            audio  = whisper.load_audio(cleaned_audio_bytes)
            transcript = audio_model.transcribe(audio, language='es')
            socketio.emit('transcription', transcript, namespace='/casa-domotica')
        else:
            print("Error: Unable to clean or process audio data")
    except Exception as e:
        print(f"Error processing audio: {e}")

# Configuración para conectarse a la base de datos MySQL en RDS
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:cYa8pAzNMGdEgUJ4R66S@databasecbhtfg.clcmyie6w5ac.eu-west-1.rds.amazonaws.com/database-cbhtfg'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['JWT_SECRET_KEY'] = 'super-secret-key'  # Clave secreta para firmar los tokens JWT
# db = SQLAlchemy(app)
# jwt = JWTManager(app)

# Definición del modelo de usuario
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(50), unique=True, nullable=False)
#     password = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)

# Ruta para el registro de usuarios
# @app.route('/register', methods=['POST'])
# def register():
    # data = request.get_json()
    # username = data.get('username')
    # password = data.get('password')
    # email = data.get('email')

    # Registro de un nuevo usuario
    # new_user = User(username=username, password=password, email=email)
    # db.session.add(new_user)
    # db.session.commit()

    # return jsonify({'message': 'User registered successfully'})

# Ruta para el inicio de sesión de usuarios
# @app.route('/login', methods=['POST'])
# def login():
    # data = request.get_json()
    # username = data.get('username')
    # password = data.get('password')

    # Inicio de sesión de un usuario existente
    # user = User.query.filter_by(username=username).first()
    # if user and user.password == password:
        # access_token = create_access_token(identity=username)
        # return jsonify({'access_token': access_token})
    # else:
        # return jsonify({'message': 'Invalid username or password'}), 401

# Ruta protegida para grabar audio y obtener datos de usuario
# @app.route('/casa-domotica', methods=['GET'])
# @jwt_required()
# def casa_domotica():
    # current_user = get_jwt_identity()
    # return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5001)
