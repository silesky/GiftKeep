import React from 'react';
import { Provider } from 'react-redux';
import { 
    AppRegistry
} from 'react-native';

import { store } from './app/stores/stores';

// needs to be default imports
import AppContainer from './app/containers/AppContainer';

const Root = () => {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    )
}
store.subscribe(Root);
AppRegistry.registerComponent('mobile', () => Root);