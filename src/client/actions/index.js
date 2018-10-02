export const USER_DATA = 'USER_DATA'
export const USER_BALANCE = 'USER_BALANCE'

export const GAME_STOP_DATA = 'IN_GAME_DATA'
export const GAME_STOP_STATE = 'IN_GAME_STATE'
export const GAME_STOP_BETTING_LIST = 'IN_GAME_BETTING_LIST'

export const setUserData = user => {return {type: USER_DATA, user}}
export const setBalance = balance => {return {type: USER_BALANCE, balance}}

export const setGameStopData = ingame => {return {type: GAME_STOP_DATA, ingame}}
export const setGameStopState = state => {return {type: GAME_STOP_STATE, state}}
export const setGameStopBettingList = bettings => {return {type: GAME_STOP_BETTING_LIST, bettings}}