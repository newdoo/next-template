import { USER_DATA, USER_BALANCE, GAME_STOP_DATA, GAME_STOP_STATE, GAME_STOP_BETTING_LIST } from '../actions'
import { combineReducers } from 'redux'

const user = (state = {nick: '', balance: 0, account: ''}, action) => {
  switch(action.type) {
    case USER_DATA:
      return Object.assign({}, state, {nick: action.user.nick, balance: action.user.balance, account: action.user.account});
    case USER_BALANCE:
      return Object.assign({}, state, {balance: action.balance});
    default:
        return state;
  }
};

const stop = (state = {bust: 0, state: 'none', bettings: []}, action) => {
  switch(action.type) {
    case GAME_STOP_DATA:
      return Object.assign({}, state, {bust: action.stop.bust, state: action.stop.action, bettings: action.stop.bettings});
    case GAME_STOP_STATE:
      return Object.assign({}, state, {state: action.state});
      case GAME_STOP_BETTING_LIST:
      return Object.assign({}, state, {bettings: action.bettings});
    default:
      return state;
  }
};

const reducers = combineReducers({
  user,
  stop
});

export default reducers