const monent = require('moment')
const config = require('../../common/config')
const io = require('socket.io').listen(config.inGameURL.split(':')[2])

const random = require('../utils/random')
const crypto = require('../utils/crypto')

const sleep = ms => new Promise(res => setTimeout(res, ms))
const send = async(msg) => io.sockets.emit('onGameMessage', await crypto.encryption(msg))

let info = { time: 0, state: 0, number: 0 }
const setInfo = (time, state, number) => info = { time, state, number }

io.sockets.on('connection', socket => {  
  send(info);

  socket.on('disconnect', function () {
    socket.removeAllListeners('disconnect');
    socket.removeAllListeners('onGameMessage');
  });
});


const run = async() => {
  await ready();
  await start();
  await run();
}

const ready = async() => {
  setInfo(monent().add(5, 's').utc().valueOf(), 'ready', undefined);

  send(info);
  await sleep(4500);
}

const start = async() => {
  setInfo(0, 'start', (await random.randomRange(100, 400000, random.seed())) / 100);

  send(info);
  await sleep(info.number * 10);
}

run();
