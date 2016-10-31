//import devToolsEnhancer from 'remote-redux-devtools';
import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducer';

export const store = createStore(reducer);


