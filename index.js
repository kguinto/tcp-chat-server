const net = require('net');

const users = {};

const messages = [];

const writeMessage = ({ user, created, text }) =>
  `[${created}] ${user}: ${text}`;

const server = net
  .createServer(socket => {
    console.log('server created');

    socket.write('Welcome to my chat server! What is your nickname?\n');

    let username;

    socket.on('data', res => {
      const response = res.toString().trim();

      if (!username) {
        const usernameIsTaken = users[response];

        if (usernameIsTaken) {
          socket.write(
            'That nickname is taken. Please choose another nickname.\n'
          );
        } else {
          // User joins server

          users[response] = { socket };
          username = response;

          console.log(JSON.stringify(users, null, 2));

          socket.write(
            messages
              .slice(-10)
              .map(message => writeMessage(message))
              .join('\n') + '\n'
          );

          Object.keys(users).forEach(name => {
            const user = users[name];

            user.socket.write(`${username} has entered the chat!\n`);
          });
        }
      } else {
        // User writes message

        messages.push({
          created: Date.now(),
          user: username,
          text: response
        });
      }
    });
  })
  .on('error', err => {
    // handle errors here
    throw err;
  });

// Grab an arbitrary unused port.
server.listen(3005, () => {
  console.log('opened server on', server.address());
});
