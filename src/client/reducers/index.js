import { combineReducers } from 'redux'
import balanceReducer from './balanceReducer'
import userReducer from './userReducer'

export default combineReducers({
  balance: balanceReducer,
  user: userReducer
});
