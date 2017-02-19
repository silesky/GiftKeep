import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './../actions/'
import {
  Tabs,
  Content
} from 'native-base'
// Components
import {
  NotificationBottom,
  TopBar,
  Drawer,
  BottomBar
   } from './../components/'
import { LightTheme } from '../themes/'
import FriendFormCreateUpdate from './../containers/FriendFormCreateUpdate'
// Containers (not named exports)
import DrawerContainer from './../containers/DrawerContainer'
import BodyFriendView from './../containers/BodyFriendView'
import BodyEventsView from './../containers/BodyEventsView'
import { getFriendItemById } from './../utils/utils'
import colors from '../themes/colors';
class AppContainer extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Drawer
        handleCloseDrawer={this.props.actions.leftDrawerVisibility.bind(this, false)}
        isDrawerOpen={this.props.isLeftDrawerOpen}
        content={<DrawerContainer />}>
        <TopBar
          addGift={this.props.actions.addGift.bind(this, this.props.selectedFriendId)}
          addEvent={this.props.actions.friendFormEventCreate.bind(this, this.props.selectedFriendId, undefined, undefined)}
          friendName={this.props.friendName}
          handleOpenDrawer={this.props.actions.leftDrawerVisibility.bind(this, true)}
          selectedTab={this.props.selectedTab}
          />

          <Tabs
            theme={LightTheme}
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
              {/*
             <BodyAllGiftsView
              tabLabel='All Gifts'
              isSelected={this.props.selectedTab === 'all gifts'}
              /> */}
          </Tabs>

        { this.props.bottomNotificationVisibility
          ? <NotificationBottom
              notificationText={this.props.notificationText} />
            : false
        }
        <FriendFormCreateUpdate />
      </Drawer>

    )
  }
}

const mstp = (state) => {
  const { notificationText, bottomNotificationVisibility } = state.notification
  const { selectedFriendId, selectedTab, isLeftDrawerOpen } = state.visible
  return {
    isLeftDrawerOpen: isLeftDrawerOpen,
    hasFriends: !!state.user.data.length,
    selectedFriendId,
    selectedTab,
    notificationText,
    bottomNotificationVisibility,
    friendName: getFriendItemById(state, selectedFriendId, 'friendName')
  }
}
// no more store.dispatch(actions.friendFormCreateAndSave())
const mdtp = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mstp, mdtp)(AppContainer)
