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
    Attempts to clean audio data.
    """
    try:
        if isinstance(audio_bytes, bytes):
            cleaned_bytes = b''.join(frame for frame in audio_bytes if isinstance(frame, bytes) and frame != b'\0')
            return cleaned_bytes
        else:
            raise TypeError("Received data is not of bytes-like object type")
    except Exception as e:
        print(f"Error while cleaning audio: {e}")
        return None

@socketio.on('audio')
def handle_audio(audio_data):
    print("Received audio data")

    try:
        audio_model = whisper.load_model("medium")  # Ruta correcta al modelo Whisper
    except FileNotFoundError:
        print("Whisper model not found")
        return

    audio_bytes = base64.b64decode(audio_data)

    try:
        print("Cleaning audio data...")
        cleaned_audio_bytes = clean_audio_bytes(audio_bytes)
        if cleaned_audio_bytes is not None:
            print("Audio data cleaned successfully")
            print("Transcribing audio...")
            audio = whisper.load_audio(cleaned_audio_bytes)
            transcript = audio_model.transcribe(audio, language='es')
            print("Audio transcribed successfully")
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
