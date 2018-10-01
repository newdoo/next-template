const moment = require('moment')
const config = require('../../common/config')
const io = require('socket.io').listen(config[process.env.NODE_ENV].inGameURL.split(':')[2])

const random = require('../utils/random')
const crypto = require('../utils/crypto')
const redis = require('../utils/redis')
const easing = require('../../common/easing')

const onGameHistory = async(msg) => (await redis.lrange('game.history', msg.start, msg.start + msg.count - 1)).map(v => JSON.parse(v))

let roundInfo = {state: 'none'}
let bettings = []
let stops = []
let currentBust = 0;

const setRoundInfo = (time, state, number, seed) => roundInfo = {time, state, number, seed}
const sleep = ms => new Promise(res => setTimeout(res, ms))
const broadcast = async(type, msg) => io.sockets.emit(type, await crypto.encryption(msg))
const send = async(type, socket, msg) => socket.emit(type, await crypto.encryption(msg))

io.sockets.on('connection', async(socket) => {   
    broadcast('onGameEnter', {roundInfo, stops, bettings});
  
    socket.on('onGameHistory', async(msg) => {
        send('onGameHistory', socket, await onGameHistory(JSON.parse(await crypto.decipher(msg))));
    });    

    socket.on('onGameStop', async(msg) => {
        msg = JSON.parse(await crypto.decipher(msg));
    
        if(roundInfo.state !== 'start') return;
        const temp = {nick: msg.nick, time: currentBust};
        stops = stops.concat(temp);
    
        broadcast('onGameStop', temp);    
    });
    
    socket.on('onGameBetting', async(msg) => {
        msg = JSON.parse(await crypto.decipher(msg));
    
        if(roundInfo.state !== 'ready') return;
        bettings = stops.concat(msg);

        broadcast('onGameBetting', msg);
    });

    socket.on('disconnect', function () {
        socket.removeAllListeners('disconnect');
        socket.removeAllListeners('onGameEnter');
        socket.removeAllListeners('onGameInfo');
        socket.removeAllListeners('onGameHistory');
        socket.removeAllListeners('onGameStop');
        socket.removeAllListeners('onGameBetting');    
    });
});


const run = async() => {
  await ready();
  await start();
  await bust();
  await run();
}

const ready = async() => {
    setRoundInfo(moment().utc().valueOf(), 'ready', undefined, undefined);
    broadcast('onGameInfo', roundInfo);  

    await sleep(5000);
}

const start = async() => {
    currentBust = 0;

    const seed = random.seed();
    const number = (await random.randomRange(100, config.bustMaxValue * 100, seed)) / 100;
    const time = moment().utc().valueOf();

    // 최소 시간으로 계산을 했을경우
    // 약 한달에 2만개 로그가 남는다
    await redis.lpush('game.history', JSON.stringify({time, number, seed}));
  
    setRoundInfo(time, 'start', number, seed);
    broadcast('onGameInfo', {time, state: 'start'});
  
    const go = () => new Promise((resolve) => {    
      const interval = setInterval(() => {
        const now = moment().utc();
        currentBust = easing.easeInSine(now.diff(moment(time)), 0, config.bustMaxValue, config.bustMaxTime);
        if(currentBust >= number) {
          clearInterval(interval);
          resolve();
        }
      }, 100)
    });  

    await go();
}

const bust = async() => {
    setRoundInfo(undefined, 'bust', roundInfo.number, roundInfo.seed);
    broadcast('onGameInfo', roundInfo);
    
    await sleep(3000);
}
      
run();
