const { Server } = require('net');

const Message = require('./Message');
const Connection = require('./Connection');
const Chatroom = require('./Chatroom');

const chatroom = new Chatroom();

const server = new Server()
  .on('connection', socket => {
    console.log('connection established');

    socket.write('Welcome to my chat server! What is your nickname?\n');

    const connection = new Connection({ socket });

    socket.on('data', res => {
      const response = res.toString().trim();

      if (!connection.nickname) {
        // Check if nickname is taken
        const nicknameIsTaken = chatroom.hasNickname(response);

        if (nicknameIsTaken) {
          socket.write(
            'That nickname is taken. Please choose anotherz nickname.\n'
          );
        } else {
          // User joins server
          connection.nickname = response;

          chatroom.addConnection(connection);
        }
      } else {
        // User writes message
        chatroom.addMessage(
          new Message({ user: connection.nickname, text: response })
        );
      }
    });
  })
  .on('error', err => {
    // handle errors here
    throw err;
  });

server.listen(3005, () => {
  console.log('opened server on', server.address());
});
