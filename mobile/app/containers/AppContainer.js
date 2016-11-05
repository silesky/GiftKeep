import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { bindActionCreators } from 'redux'
import * as actions from './../actions/actions';
import CreateFriendForm from './../components/CreateFriendForm';
// Components
import { TopBar } from './../components/TopBar';
import { BottomBar } from './../components/BottomBar';

//Containers (not named exports)
import DrawerContainer from './../containers/DrawerContainer';
import Body from './../containers/Body';



class AppContainer extends Component {
    constructor() {
      super()
    }
render() {
    const { selectedFriendId, createFriendModalVisibility } = this.props.state.visible;
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
            <Body friendId={selectedFriendId} />
            <CreateFriendForm 
                selectFriend={this.props.actions.selectFriend}
                createFriend={this.props.actions.createFriend}
                createFriendToggleModalVisible={this.props.actions.createFriendToggleModalVisible}  
                createFriendModalVisibility={createFriendModalVisibility} />
            <BottomBar 
                addGift={this.props.actions.addGift.bind(this, selectedFriendId)} 
                createFriendToggleModalVisible={this.props.actions.createFriendToggleModalVisible} 
            />
    </Drawer>
    
)}}


const mstp = (state) => ({state});
// no more store.dispatch(actions.createFriend())
const mdtp = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mstp, mdtp)(AppContainer)
    