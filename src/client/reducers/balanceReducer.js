import types from '../actions/types'

export default (state, action) => {
  switch (action.type) {
    case types.BALANCE_UPDATE:
      return state + action.payload;
    case types.COUNT_SET:
      return action.payload;
    default:
      return 0;
  }
};
