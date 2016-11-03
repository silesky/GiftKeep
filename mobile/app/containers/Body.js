import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { GiftCard } from './../components/GiftCard';
import { FriendInfo } from './../components/FriendInfo';

class Body extends Component {
    constructor() {
      super()
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
           { gifts.map((el, index) => {
                    return (
                        <GiftCard
                        giftName={el.giftName} 
                        key={index}
                         />

                 )
              
            })

        }
        </Content>
    </Container>)
}
}

const mstp = (state) => ({state});
export default connect(mstp)(Body)