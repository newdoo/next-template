import types from '../actions/types'

export default (state = {bit: 0, eth: 0}, action) => {
  switch (action.type) {
    case types.BALANCE_ETH_SET:
      return state + { ...state, eth: action.payload };
    case types.BALANCE_BIT_SET:
      return state + { ...state, bit: action.payload };      
    case types.BALANCE_SET:
      return action.payload;
    default:
        return state;
  }
};
