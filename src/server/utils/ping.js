const moment = require('moment')

let list = {}

const push = (key, time) => {
  time = moment().utc().valueOf() - time;
  const v = list[key];

  if(v === undefined) list[key] = time;
  else list[key] = (list[key] + time) / 2;
}

const get = key => list[key]
const clear = () => list = {}

module.exports = { push, get, clear }