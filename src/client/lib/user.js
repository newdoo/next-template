import network from './network'

export const userCreate = async(nick) => await network('user', 'create', {nick})
export const userInfo = async(nick) => await network('user', 'info', {nick})
export const userLogin = async(nick) => await network('user', 'login', {nick})
