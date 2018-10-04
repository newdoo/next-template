import network from './network'
import crypto from 'crypto-promise'

const salt = async() => await crypto.randomBytes(64)
const make = async(pass) => (await crypto.pbkdf2(pass, await salt().toString('base64'), 10321, 64, 'sha512')).toString('base64')

export const userCreate = async(account, nick, pass) => await network('user', 'create', {account, nick, pass: await make(pass)})
export const userInfo = async(nick) => await network('user', 'info', {nick})
export const userLogin = async(account, pass) => await network('user', 'login', {account, pass: await make(pass)})

export const writePost = async(title, body, tags) => await network('blog','writePost',{title, body, tags})
export const getPost = async(id) => await network('blog','getPost',{id})
export const editPost = async(id, title, body, tags) => await network('blog','editPost',{id, title, body, tags})