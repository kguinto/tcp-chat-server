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

    const userList = this.getUserList();

    connection.socket.write(
      `${userList.length} users currently in chat:\n${userList.join(', ')}\n`
    );
  }

  addMessage(message) {
    this.messages.push(message);

    const userMentions = message.text.match(/@[\S]+/g);

    if (userMentions.length) {
      userMentions.forEach(userMentions => {
        const nickname = userMentions.slice(1); // strip out @

        if (this.hasNickname(nickname)) {
          this.connections[nickname].socket.write('\x07');
        }
      });
    }

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

  getUserList() {
    return Object.keys(this.connections);
  }
}

module.exports = Chatroom;
