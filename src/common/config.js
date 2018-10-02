let config = null;

if(config !== null)
  console.log = config.log === true ? console.log : () => {};

module.exports = config === null ? config = JSON.parse(require('fs').readFileSync('./src/common/config.json')) : config;