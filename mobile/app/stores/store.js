import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { rootReducer } from './../reducers/reducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));
//export const store2 = createStore(rootReducer);
//console.log(store2.getState());
console.log(store.getState());




