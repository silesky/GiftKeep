import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawer from 'react-native-drawer';

import { store } from '../store';
import * as actions from '../actions';
import { GiftCard } from './../components/GiftCard';
import { DrawerContainer } from './../containers/DrawerContainer';
import { FriendInfo, BottomBar, Body } from '../index.ios';
import { TopBar } from './../components/TopBar';

class AppContainer extends Component {
    constructor() {
      super()
    }
render() {
    console.log(this.props);
    return (
    <Drawer
        tapToClose={true}
        openDrawerOffset={0.6 /* % gap on right side of drawer */}
        panCloseMask={0.6 /* tightly coupled ^. % of screen can be used to close (if tapToClose=true}    */}
        closedDrawerOffset={-3}
        ref={(ref) => this._drawer = ref}
        type='static'
        content={<DrawerContainer />}
        >   
            <TopBar drawerOpen={() => this._drawer.open()} />                
            <Body friendId={123} />
            <BottomBar 
            addGift={() => store.dispatch(actions.addGift(123))} 
            addFriend={() => store.dispatch(actions.addFriend())} 
            />
    </Drawer>
    
)}}

const mstp = (state) => {
    return {
        state: state
    }
}

export default connect(mstp)(AppContainer)
    