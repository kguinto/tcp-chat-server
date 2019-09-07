const net = require('net');
const Message = require('./Message');
const Connection = require('./Connection');

const connections = {};

const messages = [];

const server = net
  .createServer(socket => {
    console.log('server created');

    socket.write('Welcome to my chat server! What is your nickname?\n');

    const connection = new Connection({ socket });

    socket.on('data', res => {
      const response = res.toString().trim();

      if (!connection.nickname) {
        // Check if nickname is taken
        const nicknameIsTaken = connections[response];

        if (nicknameIsTaken) {
          socket.write(
            'That nickname is taken. Please choose another nickname.\n'
          );
        } else {
          // User joins server
          connection.nickname = response;

          connections[response] = connection;

          console.log(JSON.stringify(connections, null, 2));

          socket.write(
            messages
              .slice(-10)
              .map(message => message.format())
              .join('\n') + '\n'
          );

          Object.keys(connections).forEach(name => {
            const conn = connections[name];

            conn.socket.write(`${connection.nickname} has entered the chat!\n`);
          });
        }
      } else {
        // User writes message
        messages.push(
          new Message({ user: connection.nickname, text: response })
        );

        console.log({ messages });
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
