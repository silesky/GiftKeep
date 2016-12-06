import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './../actions/actions';
import { Content } from 'native-base';
import { GiftCard } from './../components/GiftCard';
import { FriendInfoBar } from './../components/FriendInfoBar';
import { getFriendItemById } from './../utils/utils';
class BodyFriendView extends Component {
  constructor() {
    super();
  }
  render() {
    const { friendId, state } = this.props;
    const bday = getFriendItemById(state, friendId, 'bday'),
      friendName = getFriendItemById(state, friendId, 'friendName'),
      gifts = getFriendItemById(state, friendId, 'gifts');
    return (
      <Content>
        <FriendInfoBar
          friendName={friendName}
          bday={bday}
          />
        {gifts.map((el, ind) => {
          return (
            <GiftCard
              deleteGift={this.props.actions.deleteGift.bind(this, friendId, el.giftId)}
              giftDesc={el.giftDesc}
              updateGiftTitle={this.props.actions.updateGiftTitle.bind(this, friendId, el.giftId)}
              updateGiftDesc={this.props.actions.updateGiftDesc.bind(this, friendId, el.giftId)}
              giftId={el.giftId}
              giftTitle={el.giftTitle}
              key={ind} />
          )
        })}
      </Content>
    )
  }
}


const mdtp = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = (state) => ({ state });
export default connect(mstp, mdtp)(BodyFriendView)