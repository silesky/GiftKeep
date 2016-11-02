import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawer from 'react-native-drawer';

import { store } from '../store';
import * as actions from '../actions';
import { GiftCard } from './../components/GiftCard';
import { DrawerContainer } from './../containers/DrawerContainer';
import { FriendInfo, BottomBar, Body } from '../index.ios';
import { TopBar } from './../components/TopBar';
export class AppContainer extends Component {
    constructor(props) {
      super(props);
      console.log(props);
    }
    render() {
        return (
                <Drawer
                    tapToClose={true}
                    openDrawerOffset={0.6 /* % gap on right side of drawer */}
                    panCloseMask={0.6 /* tightly coupled ^. % of screen can be used to close (if tapToClose=true}    */}
                    closedDrawerOffset={-3}
                    ref={(ref) => this._drawer = ref}
                    type='static'
                    content={<DrawerContainer state={this.props.state}/>}
                    >   
                        <TopBar drawerOpen={() => this._drawer.open()} />                
                        <Body friendId={123} />
                        <BottomBar 
                        addGift={() => store.dispatch(actions.addGift(123))} 
                        addFriend={() => store.dispatch(actions.addFriend())} 
                        />
                </Drawer>
           );
    }

}
const mapStateToProps = ({state}) => (state);
export default connect(mapStateToProps)(DrawerContainer)
    