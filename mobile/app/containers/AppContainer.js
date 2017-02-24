import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './../actions/'
import {
  Content
} from 'native-base'
// Components
import {
  NotificationBottom,
  TopBar,
  Drawer,
  TabWrapper,
  BottomBar
   } from './../components/'
import { colors } from './../themes/'

import {
  BodyEventsView,
  BodyFriendView,
  DrawerContainer,
  FriendFormCreateUpdate
} from './../containers/'

import { getFriendItemById } from './../utils/utils'

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
          giftBtnIsDisabled={!this.props.hasFriends}
          eventBtnIsDisabled={!this.props.hasFriends}
          handleOpenDrawer={this.props.actions.leftDrawerVisibility.bind(this, true)}
          selectedTab={this.props.selectedTab}
          />

        <TabWrapper handleChangeTab={this.props.actions.selectTab}>
            <BodyFriendView
              tabLabel='Gifts'
              isSelected={this.props.selectedTab === 'gifts'}
              friendId={this.props.selectedFriendId}
              />
            <BodyEventsView
              tabLabel='Events'
              isSelected={this.props.selectedTab === 'events'}
              />
          </TabWrapper>

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
