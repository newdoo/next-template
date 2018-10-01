const crypto = require('crypto')

const randomRange = (min, max) => {
  const byte = crypto.randomBytes(4);
  const value = parseInt(byte.toString('hex'), 16).toString(10);
  return value % (max - min) + min;
}

module.exports = { randomRange }
