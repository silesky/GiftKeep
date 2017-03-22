import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './../actions/'
import { Content, Card } from  './../sporks/native-base'
import { LightTheme } from './../themes/'
import {
  NoFriendsAlert,
  NoGiftsAlert,
  GiftCard
} from './../components/'

import { BodyCreateGiftModal } from './../containers'
import * as Utils from './../utils/utils'
import { View } from 'react-native'
class BodyGiftsView extends Component {
  constructor () {
    super()
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
      createGiftModalVisibility
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
                onGiftInputSelect={this.props.actions.giftInputFocus.bind(this, el.giftId)}
                deleteGift={this.props.actions.deleteGift.bind(this, selectedFriendId, el.giftId)}
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
      {
        (selectedTab === 'gifts') ? body : false // selectedTab related to this bug https://trello.com/c/jMfL798g/127-should-not-be-transparent-when-i-m-selecting-events-view
      }
      </Content>
    )
  }
}

const mdtp = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = (state) => {
  const { bday, friendName, gifts } = Utils.getFriendByFriendId(state, state.visible.selectedFriendId)
  const newGifts = gifts && gifts.length ? gifts : []
  return {
    selectedGiftId: state.visible.selectedGiftId,
    selectedTab: state.visible.selectedTab,
    selectedFriendId: state.visible.selectedFriendId,
    bday,
    gifts: newGifts,
    friendName,
    hasFriends: !!state.user.data.length,
    hasGifts: !!newGifts.length,
    createGiftModalVisibility: state.visible.createGiftModalVisibility
  }
}
export default connect(mstp, mdtp)(BodyGiftsView)
