const redis = require('redis')
const client = redis.createClient()
const { promisify } = require('util')
const aGet = promisify(client.get).bind(client)
const aHget = promisify(client.hget).bind(client)

get = async(key) => { 
  try {
    const result = await aGet(key);
    return {result: result !== null ? 'ok' : 'error', data: JSON.parse(result)}
  } catch (e) {
    return {result: 'error', message: e.message}
  }
}

hget = async(key, field) => {
  try {
    const result = await aHget(key, field);
    return {result: result !== null ? 'ok' : 'error', data: JSON.parse(result)}
  } catch (e) {
    return {result: 'error', message: e.message}
  }
}

set = (key, value) => {
  client.set(key, JSON.stringify(value), (error, result) => {});
  return {result: 'ok'};
}

hset = (key, field, value) => {
  client.hset(key, field, value, (error, result) => {});
  return {result: 'ok'};
}

incr = key => {
  client.incr(key, (error, result) => {});
  return {result: 'ok'};
}

module.exports = {get, hget, set, hset, incr}
