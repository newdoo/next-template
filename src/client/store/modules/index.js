import { combineReducers } from 'redux';

import clock from './clock';
import editor from './editor';
import list from './list';
import post from './post';
import user from './user';
import stop from './stop';
import { penderReducer } from 'redux-pender';

export default combineReducers({
    clock,
    editor,
    list,
    post,
    user,
    stop,
    pender: penderReducer
});