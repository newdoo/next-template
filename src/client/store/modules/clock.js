import { createAction, handleActions } from 'redux-actions'

import { Map } from 'immutable'

// action types
const INITIALIZE = 'clock/INITIALIZE';
const SERVER_RENDER_CLOCK = 'clock/SERVER_RENDER_CLOCK';
const START_CLOCK = 'clock/START_CLOCK';

// action creators
export const initialize = createAction(INITIALIZE);
export const setServerRenderClock = createAction(SERVER_RENDER_CLOCK);
export const setStartClock = createAction(START_CLOCK);

// initial state
const initialState = Map({
  lastUpdate: 0,
  light: false,
  count: 0
});

export default handleActions({
  [INITIALIZE]: (state, action) => initialState,
  [SERVER_RENDER_CLOCK]: (state, action) => dispatch => {
    return state.set('lastUpdate', Date.now())
                .set('light', !action.payload);
  },
  [START_CLOCK]: (state, action) => {
    return state.set('lastUpdate', action.payload.ts)
                .set('light', action.payload.light);
  },
}, initialState)


