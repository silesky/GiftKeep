import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from './../actions/'
import { GiftCard } from './../components/GiftCard'
import {
  Container,
  Content
} from 'native-base'
import * as Utils from './../utils/utils'
// should get an array of all the gifts
class BodyAllGiftsView extends React.Component {
  static propTypes = {
    isSelected: React.PropTypes.bool,
    allGifts: React.PropTypes.array
  }
  render() {
    // I can use truthy or falsy, but I prefer to keep the logic explicit in case I want to add another tab

    return (
      <Container>
        <Content>
          {
            this.props.allGifts.map((el, ind) => {
              return (
                <GiftCard
                  footerIsVisible={this.props.selectedTab === 'events'}
                  friendId={el.friendId}
                  friendName={el.friendName}
                  deleteGift={this.props.actions.deleteGift.bind(this, el.friendId, el.giftId)}
                  giftDesc={el.giftDesc}
                  updateGiftTitle={this.props.actions.updateGiftTitle.bind(this, el.friendId, el.giftId)}
                  updateGiftDesc={this.props.actions.updateGiftDesc.bind(this, el.friendId, el.giftId)}
                  giftId={el.giftId}
                  giftTitle={el.giftTitle}
                  key={ind} />
              )
            })
          }
        </Content>
      </Container>
    );
  }
}

const mdtp = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = (state) => {
  
 const allGifts = Utils.getAllGifts(state)
    .map(eachGift => {  // add neccessary properties to my iterable
      const { friendId, friendName } = Utils.getFriendByGiftId(state, eachGift.giftId);
      eachGift.friendId = friendId;
      eachGift.friendName = friendName;
      return eachGift
  })
  return {
    allGifts: allGifts,
    selectedTab: state.visible.selectedTab,
  }
};
export default connect(mstp, mdtp)(BodyAllGiftsView)