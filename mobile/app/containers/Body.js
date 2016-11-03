import React, { Component } from 'react';
import {  connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { GiftCard } from './../components/GiftCard';
import { FriendInfo } from './../components/FriendInfo';

class Body extends Component {
    constructor() {
      super()
    }
render() {
    let { state, friendId } = this.props;
    let bday = state.data.find((el => el.friendId === friendId)).bday;
    let friendName = state.data.find((el) => el.friendId === friendId).friendName;
    return (
        <Container style={{backgroundColor: 'white'}}>
            <Content>
            <FriendInfo friendName={friendName} bday={bday} />
           {
           state.data.find((el) => el.friendId === friendId)
                .gifts.map((el, index) => {
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