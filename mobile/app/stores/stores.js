

// TODO: The NEW Access Token is not being saved to the DB on login


import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native'
import { rootReducer } from './../reducers/reducers';
import { composeWithDevTools } from 'remote-redux-devtools';
import { saveToAsyncStorage, getFromAsyncStorage, updateUserDataByAccessToken, updateUserByBody } from './../utils/utils';
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
console.log('store created.');


export const storeStateInAsyncStorage = () => {
  // whenever the store changes, save it to async storage
  try {
    saveToAsyncStorage("store", store.getState());
  } catch(err) {
    console.log(err)
  }
}

export const storeStateInDb = () => {
  const state = store.getState();
  console.log('stores.js', state);
  updateUserByBody({user: state.user})
  .then(successOrFail => console.log('success or fail', successOrFail))
  .catch(err => console.log('stores.js', err));
}

// on first load
export const hydrateFromAsyncStorage = () => { 
  return getFromAsyncStorage('store')  
      .then(res => {
        
        const { user, visible } = JSON.parse(res);
        store.dispatch({type: 'HYDRATE_USER', payload: user})
        store.dispatch({type: 'HYDRATE_VISIBLE', payload: visible}); 
      })
  }
  
hydrateFromAsyncStorage();
store.subscribe(storeStateInAsyncStorage)
store.subscribe(storeStateInDb)


