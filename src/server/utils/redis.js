const config = require('../../common/config')
const redis = require('redis')
const client = redis.createClient(config[process.env.NODE_ENV].redisURL.split(':')[1], config[process.env.NODE_ENV].redisURL.split(':')[0]);

const get = key => new Promise((resolve, reject) => {
  client.get(key, (error, result) => error === null ? resolve(JSON.parse(result)) : reject())
})

const set = (key, value) => new Promise((resolve, reject) => {
  client.set(key, JSON.stringify(value), (error, result) => error === null ? resolve('ok') : reject(error))
})

const hget = (key, field) => new Promise((resolve, reject) => {
  client.hget(key, field, (error, result) => error === null ? resolve(JSON.parse(result)) : reject()
  )
})

const hset = (key, field, value) => new Promise((resolve, reject) => {
  client.hset(key, field, JSON.stringify(value), (error, result) => error === null ? resolve('ok') : reject(error))
})

const incr = key => new Promise((resolve, reject) => {
  client.incr(key, (error, result) => error === null ? resolve(result) : reject(error))
})

const lpush = (key, value) => new Promise((resolve, reject) => {
  client.lpush(key, value, (error, result) => error === null ? resolve(result) : reject(error))
})

const lrange = (key, start, count) => new Promise((resolve, reject) => {
  client.lrange(key, start, count, (error, result) => error === null ? resolve(result) : reject(error))
})

const hexists = (key, field) => new Promise((resolve, reject) => {
  client.hexists(key, field, (error, result) => error === null ? resolve(result) : reject(error))
})

const exists = key => new Promise((resolve, reject) => {
  client.exists(key, (error, result) => error === null ? resolve(result) : reject(error))
})

const expireat = (key, time) => new Promise((resolve, reject) => {
  client.expireat(key, time, (error, result) => error === null ? resolve(1) : reject(error))
})

module.exports = {get, hget, set, hset, incr, lpush, lrange, hexists, exists, expireat}