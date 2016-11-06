import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './../actions/actions';
import { Container, Content } from 'native-base';
import { GiftCard } from './../components/GiftCard';
import { FriendInfo } from './../components/FriendInfo';
class Body extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        const { friendId } = this.props;
        const { data } = this.props.state.user;
        const bday = data.find((el => el.friendId === friendId)).bday;
        const friendName = data.find((el) => el.friendId === friendId).friendName;
        const gifts = data.find((el) => el.friendId === friendId).gifts
        return (
            <Container style={{backgroundColor: 'white'}}>
                <Content>
                     <FriendInfo friendName={friendName} bday={bday} />
                    { gifts.map((el, ind) => {
                        return ( 
                            <GiftCard 
                                giftDesc={el.giftDesc}
                                updateGiftDesc={this.props.actions.updateGiftDesc.bind(this, friendId, el.giftId)} 
                                giftId={el.giftId} 
                                giftName={el.giftName} 
                                key={ind} />
                        )
                    })}
                 </Content>
            </Container>)
    }
}


const mdtp = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = (state) => ({state});
export default connect(mstp, mdtp)(Body)