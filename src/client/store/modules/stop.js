import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

// action types
const GAME_STOP_DATA = 'stop/GAME_STOP_DATA';
const GAME_STOP_STATE = 'stop/GAME_STOP_STATE';
const GAME_STOP_BETTING_LIST = 'stop/GAME_STOP_BETTING_LIST';

// action creators
export const setGameStopData = createAction(GAME_STOP_DATA);
export const setGameStopState = createAction(GAME_STOP_STATE);
export const setGameStopBettingList = createAction(GAME_STOP_BETTING_LIST);

// initial state
const initialState = Map({
  
  stop: Map({
    bust: 0, 
    state: 'none', 
    bettings: []
  })

});

// reducer
export default handleActions({
  [GAME_STOP_DATA]: (state, action) => {
    console.log(action);
    return state.set('stop', {bust: action.stop.bust, state: action.stop.action, bettings: action.stop.bettings});
  },
  [GAME_STOP_STATE]: (state, action) => {
    return state.set('stop', {state: action.payload});
  },
  [GAME_STOP_BETTING_LIST]: (state, action) => {
    console.log(action);
    return state.set('stop', {bettings: action.payload});
  },

}, initialState)