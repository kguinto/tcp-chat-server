class Connection {
  constructor({ socket }) {
    this.socket = socket;
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }
}

module.exports = Connection;
