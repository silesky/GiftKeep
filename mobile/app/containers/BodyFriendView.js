import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './../actions/';
import { Content } from 'native-base';

import { 
  NoFriendsAlert, 

  GiftCard
} from './../components/';
import { NoGiftsAlert } from './../components/NoGiftsAlert';
import * as Utils from './../utils/utils';
class BodyFriendView extends Component {
  constructor() {
    super();
  }
  render() {
    const { 
      selectedFriendId, 
      bday, 
      friendName, 
      gifts, 
      hasFriends,
      hasGifts,
    } = this.props;

    return (
      <Content>

        { (!hasFriends)
          ? <NoFriendsAlert
            addFriendBtnClick={this.props.actions.friendFormVisibilityToggle}
            friendName={friendName}
            bday={bday}
            />
            : undefined
          }
        
        { (hasFriends && !hasGifts) 
          ? <NoGiftsAlert 
          addGiftBtnClick={this.props.actions.addGift.bind(this, selectedFriendId)}
          />
        : undefined }
        { gifts.map((el, ind) => {
          return (
            <GiftCard
              deleteGift={this.props.actions.deleteGift.bind(this, selectedFriendId, el.giftId)}
              giftDesc={el.giftDesc}
              updateGiftTitle={this.props.actions.updateGiftTitle.bind(this, selectedFriendId, el.giftId)}
              updateGiftDesc={this.props.actions.updateGiftDesc.bind(this, selectedFriendId, el.giftId)}
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
const mstp = (state) => {
  const { bday, friendName, gifts } = Utils.getFriendByFriendId(state, state.visible.selectedFriendId); 
  const newGifts =  gifts && gifts.length ? gifts : [];
  return {
    selectedFriendId: state.visible.selectedFriendId,
    bday,
    gifts: newGifts,
    friendName,
    hasFriends: !!state.user.data.length,
    hasGifts: !!newGifts.length,
}
}
export default connect(mstp, mdtp)(BodyFriendView)