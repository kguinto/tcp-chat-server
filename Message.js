const { colorText } = require('./color');

class Message {
  constructor({ color = '', user, text }) {
    this.user = user;
    this.created = new Date();
    this.text = text;
    this.color = color;
  }

  format() {
    const timestamp = `${this.created.getHours()}:${this.created.getMinutes()}:${this.created.getSeconds()}`;

    return colorText(this.color, `[${timestamp}] <${this.user}>: ${this.text}`);
  }
}

module.exports = Message;
