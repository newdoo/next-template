const crypto = require('crypto-promise')
const config = require('../../common/config')

const decipher = async(data) => (await crypto.decipher('aes256', config.secret_client)(data, 'hex')).toString()
const encryption = async(data) => ((await crypto.cipher('aes256', config.secret_server)(JSON.stringify(data)))).toString('base64')

module.exports = { decipher, encryption }