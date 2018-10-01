import types from './types'

export const updateBalance = type => { return {type: types.BALANCE_UPDATE, payload: type}}
export const setBalance = type => { return {type: types.BALANCE_SET, payload: type}}
