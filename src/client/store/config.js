import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import penderMiddleware from 'redux-pender'

import index from './modules/index';

const finalCreateStore = composeWithDevTools(applyMiddleware(thunk, penderMiddleware()))(createStore);
export default finalCreateStore(index);

export function initializeStore () {
    return finalCreateStore(index);
}
  