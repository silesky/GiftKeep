import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { bindActionCreators } from 'redux'
import * as actions from './../actions/actions';
// Components
import { TopBar } from './../components/TopBar';
import { BottomBar } from './../components/BottomBar';
import CreateFriendForm from './../components/CreateFriendForm';
//Containers (not named exports)
import DrawerContainer from './../containers/DrawerContainer';
import Body from './../containers/Body';
import { getFriendItemById } from './../utils/util';
class AppContainer extends Component {
    constructor(props) {
      super(props)
      
    }

render() {
    const { selectedFriendId, createFriendModalVisibility } = this.props.state.visible;
    

    return (

    <Drawer
        tapToClose={true}
        openDrawerOffset={0.4 /* % gap on right side of drawer */}
        panCloseMask={0.4 /* tightly coupled ^. % of screen can be used to close (if tapToClose=true}    */}
        ref={(ref) => this._drawer = ref}
        tweenDuration={70 /* speed */}
        tweenHandler={(ratio) => { /* transparency effects */
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
        content={<DrawerContainer />}
    >  


            <TopBar 
                testClick={this.props.actions.testClick} 
                friendName={getFriendItemById(this.props.state, selectedFriendId, 'friendName')} 
                drawerOpen={() => this._drawer.open()} 
            />    
                 
            <Body 
                friendId={selectedFriendId} 
            />
      
            <CreateFriendForm 
                selectFriend={this.props.actions.selectFriend}
                createFriend={this.props.actions.createFriend}
                createFriendToggleModalVisible={this.props.actions.createFriendToggleModalVisible}  
                createFriendModalVisibility={createFriendModalVisibility} 
            />

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
    