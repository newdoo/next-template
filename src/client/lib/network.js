import crypto from 'crypto-promise'
import 'isomorphic-fetch'
import config from '../../common/config.json' 

const serverURL = config[process.env.NODE_ENV].serverURL

const encryption = async(data) => (await crypto.cipher('aes256', config.secret_client)(JSON.stringify(data)))
const decipher = async(data) => (await crypto.decipher('aes256', config.secret_server)(data, 'base64')).toString()
const makeMessage = async(id, type, data) => serverURL + '/' + id + '/' + (await encryption({type, data})).toString('hex')
const toJson = async(res) => JSON.parse(await decipher(await res.json()))

export default async(id, type, data) => await toJson(await fetch(await makeMessage(id, type, data)))