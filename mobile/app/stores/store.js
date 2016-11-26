import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native'
import { rootReducer } from './../reducers/reducer';
import { saveToAsyncStorage, getFromAsyncStorage } from './../utils/util';
export const store = createStore(rootReducer, applyMiddleware(thunk));
console.log('store created.');


export const persist = () => {
  // whenever the store changes, save it to async storage
  try {
    saveToAsyncStorage("store", store.getState());
  } catch(err) {
    console.log(err)
  }
}

// on first load

export const hydrate = () => { 
  return getFromAsyncStorage("store")  
      .then(res => {
        const { user, visible } = JSON.parse(res);
        store.dispatch({type: 'HYDRATE', payload: user})
        store.dispatch({type: 'HYDRATE_VISIBLE', payload: visible}); 
      })
  }
  
store.subscribe(persist)
hydrate();



