import network from './network'
import crypto from 'crypto-promise'

const salt = async() => await crypto.randomBytes(64)
const make = async(pass) => (await crypto.pbkdf2(pass, await salt().toString('base64'), 100321, 64, 'sha512')).toString('base64')

export const userCreate = async(nick, pass) => await network('user', 'create', {nick, pass: await make(pass)})
export const userInfo = async(nick) => await network('user', 'info', {nick})
export const userLogin = async(nick, pass) => await network('user', 'login', {nick, pass: await make(pass)})