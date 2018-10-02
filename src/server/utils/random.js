const crypto = require('crypto')

const seed = () => crypto.randomBytes(32).toString('hex');

const randomRange = (min, max, seed) => new Promise((resolve) => {
  crypto.pbkdf2(seed, seed, 5000, 64, 'sha512', (error, value) => {
    resolve(parseInt(value.toString('hex'), 16) % (max - min) + min);
  });
})

module.exports = { seed, randomRange }