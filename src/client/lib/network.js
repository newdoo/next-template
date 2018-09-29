import crypto from 'crypto-promise'
import 'isomorphic-fetch'
const config = require('../../common/config')

const serverURL = config[process.env.NODE_ENV].serverURL

const encryption = async(data) => (await crypto.cipher('aes256', config.secret)(JSON.stringify(data)))
const makeMessage = async(id, type, data) => serverURL + '/' + id + '/' + (await encryption({type, data})).toString('hex')
const salt = async() => await crypto.randomBytes(64)
const makeID = async(id) => (await crypto.pbkdf2(id, await salt().toString('base64'), 100321, 64, 'sha512')).toString('base64')
const toJson = async(res) => await res.json()

export default async(id, type, message) => await toJson(await fetch(await makeMessage(id, type, message)))
