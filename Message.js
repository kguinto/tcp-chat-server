const { colorText } = require('./color');

class Message {
  constructor({ color = '', user, text }) {
    this.user = user;
    this.created = new Date();
    this.text = text;
    this.color = color;
  }

  format() {
    return colorText(
      this.color,
      `[${this.created.toISOString()}] ${this.user}: ${this.text}`
    );
  }
}

module.exports = Message;
