import React, { Component } from 'react'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import * as actions from './../actions/'

import { Content, Card } from 'native-base'

import { LightTheme } from './../themes/'

import {
  NoFriendsAlert,
  NoGiftsAlert,
  GiftCard,
} from './../components/'

import * as Utils from './../utils/utils'

import { View, LayoutAnimation } from 'react-native'

class BodyGiftsView extends Component {
  onGiftDelete (selectedFriendId, giftId) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.actions.deleteGift(selectedFriendId, giftId)
  }
  onGiftInputFocus (id) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.actions.giftInputFocus(id)
  }
  render () {
    const {
      getFriendByGiftId,
      footerIsVisible,
      selectedGiftId,
      selectedFriendId,
      bday,
      friendName,
      gifts,
      hasFriends,
      hasGifts,
      selectedTab,
    } = this.props

    const body = (
      <View>

        {!hasFriends &&
          <NoFriendsAlert
            addFriendBtnClick={this.props.actions.friendFormVisibilityToggle}
            friendName={friendName}
            bday={bday}
          />}

        {hasFriends &&
          !hasGifts &&
          <NoGiftsAlert
            addGiftBtnClick={this.props.actions.createGiftModalVisibilityTrue}
          />}

        { gifts.map(({ giftDesc, giftId }) => {
          const { friendName } = getFriendByGiftId(giftId)
          return (
            <GiftCard
              footerIsVisible={footerIsVisible}
              friendName={friendName}
              isSelected={selectedGiftId === giftId}
              onGiftInputBlur={() => this.props.actions.giftInputFocus(null)}
              onGiftInputFocus={() => this.onGiftInputFocus(giftId)}
              deleteGift={() => this.onGiftDelete(selectedFriendId, giftId)}
              giftDesc={giftDesc}
              updateGiftTitle={this.props.actions.updateGiftTitle.bind(this, selectedFriendId, giftId)}
              updateGiftDesc={this.props.actions.updateGiftDesc.bind(this, selectedFriendId, giftId)}
              giftId={giftId}
              key={giftId}
            />
          )
        })}
      </View>
    )

    return (
      <Content theme={LightTheme}>
        {selectedTab === 'gifts' && body
        /* selectedTab related to this bug
       https://trello.com/c/jMfL798g/127-should-not-be-transparent-when-i-m-selecting-events-view */
        }
      </Content>
    )
  }
}

const mdtp = dispatch => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = state => {
  const { bday, friendName, gifts } = Utils.getFriendByFriendId(
    state,
    state.visible.selectedFriendId
  )
  const { allFriendsVisibility } = state.visible
  let whichGifts
  if (allFriendsVisibility) {
    whichGifts = Utils.getAllGifts(state)
  } else {
    whichGifts = gifts && gifts.length ? gifts : []
  }

  return {
    footerIsVisible: !!state.visible.allFriendsVisibility,
    selectedGiftId: state.visible.selectedGiftId,
    selectedTab: state.visible.selectedTab,
    selectedFriendId: state.visible.selectedFriendId,
    bday,
    gifts: whichGifts,
    getFriendByGiftId: Utils.getFriendByGiftId.bind(this, state),
    hasFriends: !!state.user.data.length,
    hasGifts: !!whichGifts.length,
    createGiftModalVisibility: state.visible.createGiftModalVisibility,
  }
}
export default connect(mstp, mdtp)(BodyGiftsView)
