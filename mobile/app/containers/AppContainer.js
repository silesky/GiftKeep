import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { bindActionCreators } from 'redux'
import * as actions from './../actions/';
// Components
import { 
  ModalNotificationBottom,
  TopBar,
  BottomBar
   } from './../components';

import  FriendFormCreateUpdate from './../containers/FriendFormCreateUpdate';
//Containers (not named exports)
import DrawerContainer from './../containers/DrawerContainer';
import BodyFriendView from './../containers/BodyFriendView';
import BodyEventsView from './../containers/BodyEventsView';
import BodyAllGiftsView from './../containers/BodyAllGiftsView';
import { getFriendItemById } from './../utils/utils';

import { Tabs, Container, Content } from 'native-base';
class AppContainer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Drawer
        tapToClose={true}
        openDrawerOffset={0.3 /* % gap on right side of drawer */}
        panCloseMask={0.3 /* tightly coupled ^. % of screen can be used to close (if tapToClose=true}    */}
        ref={(ref) => this._drawer = ref}
        tweenDuration={70 /* speed */}
        tweenHandler={(ratio) => { /* transparency effects */
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        } }
        negotiatePan
        content={<DrawerContainer />}
        >
        <TopBar
          testClick={() => this.props.actions.resetAll()}
          friendName={this.props.friendName}
          drawerOpen={() => this._drawer.open()}
          />
        <Content>
          <Tabs
            initialPage={0}
            //  currentPage={this.props.state.selectedTab} broken unforuntately
            onChangeTab={(selectTabEvent) => this.props.actions.selectTab(selectTabEvent['i'])}>
            <BodyFriendView 
              tabLabel='Gifts'
              isSelected={this.props.selectedTab === 'gifts'}
              friendId={this.props.selectedFriendId}
              />
            <BodyEventsView 
              tabLabel='Events'
              isSelected={this.props.selectedTab === 'events'}
              />
             <BodyAllGiftsView 
              tabLabel='All Gifts'
              isSelected={this.props.selectedTab === 'all gifts'}
              />

          </Tabs>
        </Content>

        <FriendFormCreateUpdate />

        <BottomBar
          addGift={this.props.actions.addGift.bind(this, this.props.selectedFriendId)}
          friendFormVisibilityToggle={this.props.actions.friendFormVisibilityToggle}
          />

      </Drawer>


    )
  }
}


const mstp = (state) => {
  const { selectedFriendId, selectedTab } = state.visible;
  return {
    selectedFriendId,
    selectedTab,
    friendName: getFriendItemById(state, selectedFriendId, 'friendName')
  }
}
// no more store.dispatch(actions.friendFormCreateAndSave())
const mdtp = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mstp, mdtp)(AppContainer)
