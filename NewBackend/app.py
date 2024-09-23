from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

# Socket Events
@socketio.on('connect')
def handle_connect():
    print("Client Connected!")

@socketio.on('disconnect')
def handle_disconnect():
    print('Client Disconnected')

@socketio.on('message')
def handle_message(data):
    print(f"Message received: {data}")
    socketio.emit('message', data) # emit/send the message back to every client connected to the server.  first parameter is the type of event to emit, 2nd is the data

@socketio.on('set_username')
def set_username(username):
    print(f"Username Added: {username}")
    socketio.emit('Username Added', username)

if __name__ == '__main__':
    socketio.run(app)