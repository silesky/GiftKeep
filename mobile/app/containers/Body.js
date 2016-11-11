import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './../actions/actions';
import { Container, Content } from 'native-base';
import { GiftCard } from './../components/GiftCard';
import { FriendInfoBar } from './../components/FriendInfoBar';
import { getFriendItemById } from './../utils/util';
class Body extends Component {
    constructor(props) {
      super(props);
    }

    
    render() {
        const { friendId } = this.props;
        const bday = getFriendItemById(this.props.state, friendId, 'bday');
        const friendName = getFriendItemById(this.props.state, friendId, 'friendName');
        const gifts =  getFriendItemById(this.props.state, friendId, 'gifts');


        return (

                <Content>
                     <FriendInfoBar friendName={friendName} bday={bday} />
                    { gifts.map((el, ind) => {
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
const mstp = (state) => ({state});
export default connect(mstp, mdtp)(Body)