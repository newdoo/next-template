import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

// action types
const USER_DATA = 'user/USER_DATA';
const USER_BALANCE = 'user/USER_BALANCE';

// action creators
export const setUserData = createAction(USER_DATA);
export const setBalance = createAction(USER_BALANCE);

// initial state
const initialState = Map({
  user: Map({
    nick: '', 
    balance: 0,
    account: ''
  })
});

// reducer
export default handleActions({
  [USER_DATA]: (state, action) => {
    console.log(action);
    return state.set('user', {nick: action.user.nick, balance: action.user.balance, account: action.user.account});
  },
  [USER_BALANCE]: (state, action) => {
    console.log(action);
    return state.set('user', {balance: action.balance});
  },
}, initialState)