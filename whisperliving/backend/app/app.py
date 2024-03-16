from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)


# Configuración para conectarse a la base de datos MySQL en RDS
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:cYa8pAzNMGdEgUJ4R66S@database-cbhtfg.clcmyie6w5ac.eu-west-1.rds.amazonaws.com/database-cbhtfg'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret-key'  # Clave secreta para firmar los tokens JWT
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Definición del modelo de usuario
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)


# Ruta para el registro de usuarios y el inicio de sesión
@app.route('/login', methods=['POST'])
def login_or_register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email') 
    action = data.get('action')  # Agregar campo 'action' para distinguir entre registro e inicio de sesión

    if action == 'register':
        # Registro de un nuevo usuario
        new_user = User(username=username, password=password, email=email)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'})
    elif action == 'login':
        # Inicio de sesión de un usuario existente
        user = User.query.filter_by(username=username).first()
        if user and user.password == password:
            access_token = create_access_token(identity=username)
            return jsonify({'access_token': access_token})
        else:
            return jsonify({'message': 'Invalid username or password'}), 401
    else:
        return jsonify({'message': 'Invalid action'}), 400

# Ruta protegida
@app.route('/casa-domotica', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=False)