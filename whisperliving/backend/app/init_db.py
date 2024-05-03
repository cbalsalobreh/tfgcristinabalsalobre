import sqlite3

# Conectar a la base de datos SQLite
connection = sqlite3.connect('database.db')

# Ejecutar el script SQL para crear las tablas
with open('schema.sql') as f:
    connection.executescript(f.read())

# Insertar datos de ejemplo (opcional)
cur = connection.cursor()
cur.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            ('user1', 'user1@example.com', 'password123')
            )

cur.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            ('user2', 'user2@example.com', 'password456')
            )

# Confirmar los cambios y cerrar la conexión
connection.commit()
connection.close()
