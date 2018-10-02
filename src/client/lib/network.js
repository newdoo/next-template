import { encryption, decipher } from './crypto'
import 'isomorphic-fetch'
import config from 'common/config.json' 

const serverURL = config[process.env.NODE_ENV].serverURL

const makeMessage = async(id, type, data) => serverURL + '/' + id + '/' + (await encryption({type, data})).toString('hex')
const toJson = async(res) => JSON.parse(await decipher(await res.json()))

export default async(id, type, data) => await toJson(await fetch(await makeMessage(id, type, data)))