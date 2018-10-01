import types from '../actions/types'

export default (state = { uuid: '', nick: '' }, action) => {
  switch (action.type) {
    case types.UUID_SET:
        return state = { ...state, uuid: action.payload };
    case types.NICK_SET:
        return state = { ...state, nick: action.payload };
    default:
      return state;
  }
};
