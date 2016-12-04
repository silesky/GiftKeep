import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from './../actions/actions'
import { GiftCard } from './../components/GiftCard'
import { 
  Container,
  Content
} from 'native-base'
// should get an array of all the gifts
export class BodyAllGiftsView extends React.Component {
  constructor(props) {
    super(props);
    this.getAllGifts = () => {
      return this.props.state.user.data
      .filter(el => el.gifts.length)
      .map(el => el.gifts)
      .reduce((p, n) =>  p.concat(n), [])
    }
  }
  static propTypes = {
      isSelected: React.PropTypes.bool,
  }
  render() {
      
  const gifts = this.getAllGifts()
    return (
      <Container>
        <Content>
           { gifts.map((el, ind) => {
                        return ( 
                            <GiftCard 
                                // deleteGift={this.props.actions.deleteGift.bind(this, friendId, el.giftId)}
                                giftDesc={el.giftDesc}
                                // updateGiftTitle={this.props.actions.updateGiftTitle.bind(this, friendId, el.giftId)}
                                // updateGiftDesc={this.props.actions.updateGiftDesc.bind(this, friendId, el.giftId)} 
                                giftId={el.giftId} 
                                giftTitle={el.giftTitle} 
                                key={ind} />
                        )
                    })} 
          </Content>
      </Container>
    );
  }
}

const mdtp = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = (state) => ({state});
export default connect(mstp, mdtp)(BodyAllGiftsView)