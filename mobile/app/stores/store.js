import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { rootReducer } from './../reducers/reducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));
console.log('store created.');




