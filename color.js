const TEXT_COLORS = [
  '\x1b[32m', // green
  '\x1b[33m', // yellow
  '\x1b[34m', // blue
  '\x1b[35m', // magenta
  '\x1b[36m' // cyan
];

const RESET_COLOR = '\x1b[0m';

const colorText = (color, text) => `${color}${text}${RESET_COLOR}`;

const getRandomColor = () => {
  const index = Math.floor(Math.random() * TEXT_COLORS.length);

  return TEXT_COLORS[index];
};

module.exports = {
  colorText,
  getRandomColor
};
