const monent = require('moment')
const config = require('../../common/config')
const io = require('socket.io').listen(config[process.env.NODE_ENV].inGameURL.split(':')[2])

const random = require('../utils/random')
const crypto = require('../utils/crypto')
const redis = require('../utils/redis')

const onHistory = async(msg) => (await redis.lrange('game.history', msg.start, msg.start + msg.count - 1)).map(v => JSON.parse(v));

let roundData = { time: 0, state: 0, number: 0, seed: '' }

const setRoundData = (time, state, number, seed) => roundData = { time, state, number, seed }
const sleep = ms => new Promise(res => setTimeout(res, ms))
const broadcast = async(type, msg) => io.sockets.emit(type, await crypto.encryption(msg))
const send = async(type, socket, msg) => socket.emit(type, await crypto.encryption(msg))

io.sockets.on('connection', socket => {  
    broadcast('onGameMessage', roundData);

    socket.on('onHistoryMessage', async(msg) => {
      send('onHistoryMessage', socket, await onHistory(JSON.parse(await crypto.decipher(msg))));
    });  

    socket.on('disconnect', function () {
        socket.removeAllListeners('disconnect');
        socket.removeAllListeners('onGameMessage');
        socket.removeAllListeners('onHistoryMessage');
    });
});


const run = async() => {
  await ready();
  await start();
  await sleep(1000);
  await run();
}

const ready = async() => {
    setRoundData(monent().add(5, 's').utc().format('x'), 'ready', undefined, undefined);
    broadcast('onGameMessage', roundData);  

    await sleep(5000);
}

const start = async() => {
    const seed = random.seed();
    const number = (await random.randomRange(100, 400000, seed)) / 100;

    await redis.incr('game.round');
    await redis.lpush('game.history', JSON.stringify({ number, seed, round: await redis.get('game.round') }));

    setRoundData(undefined, 'start', number, seed);
    broadcast('onGameMessage', roundData);  

    await sleep(number * 10);
}

run();
