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

import { BodyCreateGiftModal } from './../containers'
import * as Utils from './../utils/utils'
import { View, LayoutAnimation } from 'react-native'
class BodyGiftsView extends Component {
  constructor () {
    super()
  }
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

          { !hasFriends &&
            <NoFriendsAlert
              addFriendBtnClick={this.props.actions.friendFormVisibilityToggle}
              friendName={friendName}
              bday={bday}
              />
            }

          { hasFriends && !hasGifts &&
            <NoGiftsAlert
            addGiftBtnClick={this.props.actions.createGiftModalVisibilityTrue}
            />
          }

          { gifts.map((el, ind) => {
            return (
              <GiftCard
                isSelected={this.props.selectedGiftId === el.giftId}
                onGiftInputFocus={() => this.onGiftInputFocus(el.giftId)}
                deleteGift={() => this.onGiftDelete(selectedFriendId, el.giftId)}
                giftDesc={el.giftDesc}
                updateGiftTitle={this.props.actions.updateGiftTitle.bind(this, selectedFriendId, el.giftId)}
                updateGiftDesc={this.props.actions.updateGiftDesc.bind(this, selectedFriendId, el.giftId)}
                giftId={el.giftId}
                giftTitle={el.giftTitle}
                key={ind} />
            )
          })}
        </View>
    )

    return (
      <Content theme={LightTheme}>
      { (selectedTab === 'gifts') && body
      /* selectedTab related to this bug
       https://trello.com/c/jMfL798g/127-should-not-be-transparent-when-i-m-selecting-events-view */
      }
      </Content>
    )
  }
}

const mdtp = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = (state) => {
  const { bday, friendName, gifts } = Utils.getFriendByFriendId(state, state.visible.selectedFriendId)
  const { allFriendsVisibility } = state.visible
  let whichGifts
  if (allFriendsVisibility) {
    whichGifts = Utils.getAllGifts(state)
  } else {
    whichGifts = gifts && gifts.length ? gifts : []
  }
  return {
    selectedGiftId: state.visible.selectedGiftId,
    selectedTab: state.visible.selectedTab,
    selectedFriendId: state.visible.selectedFriendId,
    bday,
    gifts: whichGifts,
    friendName,
    hasFriends: !!state.user.data.length,
    hasGifts: !!whichGifts.length,
    createGiftModalVisibility: state.visible.createGiftModalVisibility,
  }
}
export default connect(mstp, mdtp)(BodyGiftsView)
