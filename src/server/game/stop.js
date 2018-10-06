const moment = require('moment')
const config = require('../../common/config')
const io = require('socket.io').listen(config[process.env.NODE_ENV].gameStopURL.split(':')[2])

const random = require('../utils/random')
const crypto = require('../utils/crypto')
const easing = require('../../common/easing')
const sleep = require('../utils/sleep')
const ping = require('../utils/ping')
const rewards = require('./rewards')
const conn = require('../mongoDB/conn')
const db = require('../mongoDB/schema')

conn();

let round = {state: 'none'}
let bettings = []
let currentBust = 0
let bustSeed
let bustNumber

const setRound = (time, state, number, seed) => round = Object.assign({}, round, {time, state, number, seed})
const broadcast = async(type, msg) => io.sockets.emit(type, await crypto.encryption(msg))
const send = async(type, id, msg) => io.to(id).emit(type, await crypto.encryption(msg))

const updateBalance = async(id, account, value, date, kind, data) => {
  console.log('aa');
  db.userSchema.findOneAndUpdate({account}, {$inc: {balance: value}}, {new: true}).then(user => {
    send('onUpdateBalance', id, {account, balance: user.balance});

    const history = new db.historySchema({kind, date, balance: user.balance, account: user.account, data});
    history.save();
  });
}

io.sockets.on('connection', async(socket) => {  
  broadcast('onGameInfo', round);
  broadcast('onGameBetting', {bettings});

  socket.on('onGameStop', async(msg) => {
    msg = JSON.parse(await crypto.decipher(msg));
    if(round.state !== 'start') return;

    let item = bettings.find(i => i.id === socket.id);
    if(item === undefined) return;
    if(item.count === 0) return;

    ping.push(msg.account, msg.time);
    item.state = item.state === 'stop' ? 'betting' : 'stop';
    item.distance = undefined;

    if(item.state === 'stop') {
      item.count = item.count - 1;
      const now = moment().utc().valueOf() - ping.get(msg.account);
      item.distance = easing.easeInSine(moment(now).diff(moment(round.time)), 0, config.game.stop.bustMaxValue, config.game.stop.bustMaxTime);
    }

    broadcast('onGameBetting', {bettings});
  });

  socket.on('onGameBetting', async(msg) => {
    msg = JSON.parse(await crypto.decipher(msg));
    ping.push(msg.account, msg.time);

    console.log(round.state);

    if(round.state !== 'ready') return;
    if(updateBalance(socket.id, msg.account, -Number(config.game.stop.bettingValue), moment().utc().valueOf(), 'game.stop.betting', {value: -config.game.stop.bettingValue}) === false) return;

    bettings = bettings.concat({id: socket.id, state: 'betting', count: 2, ...msg});
    broadcast('onGameBetting', {bettings});
  });

  socket.on('disconnect', function () {
    socket.removeAllListeners('disconnect');
    socket.removeAllListeners('onGameInfo');
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
  setRound(moment().utc().valueOf(), 'ready', undefined, undefined);
  broadcast('onGameInfo', round);

  await sleep(5000);

  if(bettings.length < 3) await ready();
}

const start = async() => {
  const time = moment().utc().valueOf();
  setRound(time, 'start', undefined, undefined);
  broadcast('onGameInfo', round);

  currentBust = 0;

  bustSeed = random.seed();
  bustNumber = (await random.randomRange(100, config.game.stop.bustMaxValue * 100, bustSeed)) / 100;

  const log = new db.logSchema({kind: 'game.stop', date: time, betting: bettings.map(v => v.account), seed: bustSeed, number: bustNumber});
  log.save();

  const go = () => new Promise((resolve) => {    
    const interval = setInterval(() => {
      const now = moment().utc();
      currentBust = easing.easeInSine(now.diff(moment(time)), 0, config.game.stop.bustMaxValue, config.game.stop.bustMaxTime);
      if(currentBust >= bustNumber) {
        clearInterval(interval);
        resolve();
      }
    }, 100)
  });

  await go();
}

const bust = async() => {
  setRound(undefined, 'bust', bustNumber, bustSeed);
  broadcast('onGameInfo', round);

  const reward = rewards(bettings.length);

  bettings.filter(v => v.state === 'stop').sort((a, b) => a.distance > b.distance ? -1 : 1).forEach((value, index) => {
    if(reward[index].profit === 0) return;  
    updateBalance(value.id, value.account, reward[index].profit, moment().utc().valueOf(), 'game.stop.win', {value: reward[index].profit, cashout : reward[index].cashout, ranking: index + 1});
  });
  
  bettings = [];
  ping.clear();

  await sleep(3000);
}

console.log('start game server...');
run();