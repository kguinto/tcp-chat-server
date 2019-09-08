const { getRandomColor } = require('./color');

class Connection {
  constructor({ socket }) {
    this.socket = socket;
    this.color = getRandomColor();
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }
}

module.exports = Connection;
