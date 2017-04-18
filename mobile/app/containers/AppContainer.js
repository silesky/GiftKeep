import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './../actions/'
import {
  Content
} from  'native-base'
// Components
import {
  NotificationBottom,
  TopBar,
  DrawerWrapper,
  TabWrapper,
  BottomBar
   } from './../components/'
import { colors } from './../themes/'

import {
  BodyCreateEventModal,
  BodyCreateGiftModal,
  BodyEventsView,
  BodyGiftsView,
  DrawerContainer,
  FriendFormCreateUpdate
} from './../containers/'

import { getFriendItemById } from './../utils/utils'

class AppContainer extends Component {
  addGift (friendId) {
    this.props.actions.createGiftModalVisibilityTrue(friendId)
  }
  render () {
    return (
      <DrawerWrapper
        handleCloseDrawer={this.props.actions.leftDrawerVisibility.bind(this, false)}
        isDrawerOpen={this.props.isLeftDrawerOpen}
        content={<DrawerContainer />}>
       { this.props.createGiftModalVisibility &&
          <BodyCreateGiftModal
            isVisible={this.props.createGiftModalVisibility }
          /> }
          { this.props.createEventModalVisibility &&
            <BodyCreateEventModal
             isVisible={this.props.createEventModalVisibility}
             /> }
        <TopBar
          eventModalShow={ this.props.actions.createEventModalVisibilityTrue.bind(this, this.props.selectedFriendId) }
          giftModalShow={ this.props.actions.createGiftModalVisibilityTrue.bind(this, this.props.selectedFriendId) }
          addEvent={ this.props.actions.friendFormEventCreate.bind(this, this.props.selectedFriendId, undefined, undefined) }
          friendName={ this.props.friendName }
          giftBtnIsDisabled={!this.props.hasFriends}
          eventBtnIsDisabled={!this.props.hasFriends}
          handleOpenDrawer={this.props.actions.leftDrawerVisibility.bind(this, true)}
          selectedTab={this.props.selectedTab}
          />
        <TabWrapper handleChangeTab={this.props.actions.selectTab}>

            <BodyGiftsView
              tabLabel='Gifts'
              isSelected={this.props.selectedTab === 'gifts'}
              friendId={this.props.selectedFriendId}
              />
            <BodyEventsView
              tabLabel='Events'
              isSelected={this.props.selectedTab === 'events'}
              />
          </TabWrapper>

        { this.props.bottomNotificationVisibility && <NotificationBottom notificationText={this.props.notificationText} /> }
        <FriendFormCreateUpdate />
      </DrawerWrapper>

    )
  }
}

const mstp = (state) => {
  const {
    notificationText,
    bottomNotificationVisibility
  } = state.notification
  const {
    selectedFriendId,
    selectedTab,
    isLeftDrawerOpen,
    createGiftModalVisibility,
    createEventModalVisibility
   } = state.visible
  return {
    isLeftDrawerOpen: isLeftDrawerOpen,
    hasFriends: !!state.user.data.length,
    selectedFriendId,
    selectedTab,
    notificationText,
    bottomNotificationVisibility,
    createGiftModalVisibility,
    createEventModalVisibility,
    friendName: getFriendItemById(state, selectedFriendId, 'friendName')
  }
}
// no more store.dispatch(actions.friendFormCreateAndSave())
const mdtp = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mstp, mdtp)(AppContainer)
