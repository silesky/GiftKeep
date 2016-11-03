import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { store } from './../stores/store';
import * as actions from './../actions/actions';

// Components
import { TopBar } from './../components/TopBar';
import {  BottomBar } from './../components/BottomBar';

//Containers (not named exports)
import DrawerContainer from './../containers/DrawerContainer';
import Body from './../containers/Body';



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
    