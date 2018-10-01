import crypto from 'crypto-promise'
import config from '../../common/config.json'

export const encryption = async(data) => (await crypto.cipher('aes256', config.secret_client)(JSON.stringify(data)))
export const decipher = async(data) => (await crypto.decipher('aes256', config.secret_server)(data, 'base64')).toString()
