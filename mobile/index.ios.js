import React from 'react';
import { Provider } from 'react-redux';
import { 
    AppRegistry
} from 'react-native';

import { store } from './store';

// needs to be default imports
import AppContainer from './containers/AppContainer';

const Root = () => {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    )
}
store.subscribe(Root);
AppRegistry.registerComponent('mobile', () => Root);