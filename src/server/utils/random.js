const crypto = require('crypto')

const seed = () => crypto.randomBytes(32).toString('hex');

const randomRange = (min, max, server, client, result) => {
  crypto.pbkdf2(server, client, 5000, 64, 'sha512', (error, seed) => {
    result(parseInt(seed.toString('hex'), 16) % (max - min) + min);
  });
}

module.exports = { seed, randomRange }