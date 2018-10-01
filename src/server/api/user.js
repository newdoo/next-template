const redis = require('../utils/redis')
const uuidv4 = require('uuid/v4')
const moment = require('moment')

const hexists = async(key, field) => await redis.hexists(key, field) === 0 ? false : true
const exists = async(key) => await redis.exists(key) === 0 ? false : true

const create = async(data) => { 
  try {
    if(await hexists('user', data.nick) === true) return {result: 'exists nick'};
    const result = await redis.hset('user', data.nick, {balance: 0});
    return {result, balance: 0, nick: data.nick};  
  } catch (e) {
    return {result: 'redis error'};
  }
}

const info = async(data) => {
  try {
    const result = await redis.hget('user', data.nick);
    return result === null ? {result: 'no nick', balance: 0} : {result: 'ok', balance: result.balance, nick: result.nick};
  } catch (e) {
    return {result: 'redis error'};
  }
}

const login = async(data) => {
  try {
    if(await hexists('user', data.nick) === false) return {result: 'create nick', uuid: '', nick: ''};

    const uuid = uuidv4();
    if(await exists('login.' + uuid) === true) return await login(data);
    
    // 2시간 동안 아무런 액션이 없다면 자동 로그 아웃
    const result = await redis.set('login.' + uuid, 0);
    await redis.expireat('login.' + uuid, moment().add(1, 'minute').unix());
    return {result, uuid};
  } catch (e) {
    return {result: 'redis error'};
  }
}

const handler = { create, info, login }
module.exports = recv => handler[recv.type](recv.data)
