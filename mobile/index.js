import React from 'react'
import { Provider } from 'react-redux'

import { store } from './app/stores/stores'

// needs to be default imports
import AppContainer from './app/containers/AppContainer'

export const Root = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}
store.subscribe(Root)
