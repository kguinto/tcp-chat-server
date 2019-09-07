class Chatroom {
  constructor() {
    this.connections = {};
    this.messages = [];
  }

  addConnection(connection) {
    this.connections[connection.nickname] = connection;

    connection.socket.write(
      this.messages
        .slice(-10)
        .map(message => message.format())
        .join('\n') + '\n'
    );

    this.broadcast(`${connection.nickname} has entered the chat!`);
  }

  addMessage(message) {
    this.messages.push(message);

    this.broadcast(message.format());
  }

  hasNickname(nickname) {
    return !!this.connections[nickname];
  }

  broadcast(text) {
    Object.keys(this.connections).forEach(key => {
      const connection = this.connections[key];

      connection.socket.write(text + '\n');
    });
  }

  removeConnection(connection) {
    if (connection.nickname && this.hasNickname(connection.nickname)) {
      delete this.connections[connection.nickname];

      this.broadcast(`${connection.nickname} has disconnected.`);
    }
  }
}

module.exports = Chatroom;
