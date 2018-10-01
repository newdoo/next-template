import crypto from 'crypto-promise'
import 'isomorphic-fetch'
import config from '../../common/config.json' 

const serverURL = config[process.env.NODE_ENV].serverURL

const encryption = async(data) => (await crypto.cipher('aes256', config.secret)(JSON.stringify(data)))
const makeMessage = async(id, type, data) => serverURL + '/' + id + '/' + (await encryption({type, data})).toString('hex')
const toJson = async(res) => await res.json()

export default async(id, type, data) => await toJson(await fetch(await makeMessage(id, type, data)))