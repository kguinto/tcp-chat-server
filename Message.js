class Message {
  constructor({ user, text }) {
    this.user = user;
    this.created = new Date();
    this.text = text;
  }

  format() {
    return `[${this.created.toISOString()}] ${this.user}: ${this.text}`;
  }
}

module.exports = Message;
