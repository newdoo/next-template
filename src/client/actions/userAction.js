import types from './types'

export const setUUID = type => { return {type: types.UUID_SET, payload: type}}
export const setNick = type => { return {type: types.NICK_SET, payload: type}}
