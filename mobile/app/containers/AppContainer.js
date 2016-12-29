import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import { bindActionCreators } from 'redux'
import * as actions from './../actions/';
// Components

import { TopBar } from './../components/TopBar';
import { BottomBar } from './../components/BottomBar';
import  FriendFormCreateUpdate from './../containers/FriendFormCreateUpdate';
//Containers (not named exports)
import DrawerContainer from './../containers/DrawerContainer';
import BodyFriendView from './../containers/BodyFriendView';
import { BodyEventsView } from './../containers/'
import BodyAllGiftsView from './../containers/BodyAllGiftsView';
import { getFriendItemById } from './../utils/utils';

import { Tabs, Container, Content } from 'native-base';
class AppContainer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { selectedFriendId, createUpdateFriendModalVisibility } = this.props.state.visible;
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
          friendName={getFriendItemById(this.props.state, selectedFriendId, 'friendName')}
          drawerOpen={() => this._drawer.open()}
          />
        <Content>
          <Tabs
            initialPage={0}
            //  currentPage={this.props.state.selectedTab} broken unforuntately
            onChangeTab={(selectTabEvent) => this.props.actions.selectTab(selectTabEvent['i'])}>
            <BodyFriendView 
              tabLabel='Gifts'
              isSelected={this.props.state.selectedTab === 0 ? true : false}
              friendId={selectedFriendId}
              />
            <BodyEventsView 
              tabLabel='Events'
              isSelected={this.props.state.selectedTab === 1 ? true : false}
              />
             <BodyAllGiftsView 
              tabLabel='All Gifts'
              isSelected={this.props.state.selectedTab === 1 ? true : false}
              />

          </Tabs>
        </Content>

        <FriendFormCreateUpdate />

        <BottomBar
          addGift={this.props.actions.addGift.bind(this, selectedFriendId)}
          friendFormVisibilityToggle={this.props.actions.friendFormVisibilityToggle}
          />

      </Drawer>


    )
  }
}


const mstp = (state) => ({ state });
// no more store.dispatch(actions.friendFormCreateAndSave())
const mdtp = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mstp, mdtp)(AppContainer)
