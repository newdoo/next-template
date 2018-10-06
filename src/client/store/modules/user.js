import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

// action types
const USER_DATA = 'user/USER_DATA';
const USER_BALANCE = 'user/USER_BALANCE';
const USER_JSON_DATA = 'user/USER_JSON_DATA';

// action creators
export const setUserData = createAction(USER_DATA);
export const setBalance = createAction(USER_BALANCE);
export const setUserJsonData = createAction(USER_JSON_DATA);

// initial state
const initialState = Map({
  user: {
    nick: '', 
    balance: 0,
    account: '',
    userData: null
  }
});

// reducer
export default handleActions({
  [USER_DATA]: (state, action) => {
    console.log(action);
    return state.set('user', {nick: action.payload.nick, balance: action.payload.balance, account: action.payload.account});
  },
  [USER_BALANCE]: (state, action) => {
    console.log(action);
    return state.set('user', {balance: action.balance});
  },
}, initialState)