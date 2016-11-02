import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { 
    AppRegistry
} from 'react-native';
import {
    Card,
    CardItem,
    Container,
    Header,
    List,
    ListItem,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Text,
    Icon
} from 'native-base';
import Drawer from 'react-native-drawer';
import { lipsum } from './util';
import { store } from './store';
import * as actions from './actions';
import { GiftCard } from './components/GiftCard';
import { DrawerContainer } from './containers/DrawerContainer';

// needs to be default imports
import AppContainer from './containers/AppContainer';

import { TopBar } from './components/TopBar';

export const FriendInfo = ({friendName, bday}) => {
        return (
                 <List>
                    <ListItem>
                        <Text>{`2 months until ${friendName}'s birthday on ${bday}.`} </Text>
                    </ListItem>
               
                </List>

            )    
       }
export const BottomBar = ({addFriend, addGift}) => {
    return (
        <Footer>
            <FooterTab>
                <Button onPress={() => addFriend()} transparent>
                    <Icon name='ios-person-add' />
                </Button>  
                <Button onPress={() => addGift()} transparent>
                    <Icon name='ios-add' />
                </Button>  
            </FooterTab>
        </Footer>
        )
}



//addFriendButton

export const Body = ({friendId}) => {
    let bday = store.getState().data.find((el => el.friendId === friendId)).bday;
    let friendName = store.getState().data.find((el) => el.friendId === friendId).friendName;
    return (
        <Container style={{backgroundColor: 'white'}}>
            <Content>
            <FriendInfo friendName={friendName} bday={bday} />
           {
            store.getState().data.find((el) => el.friendId === friendId)
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


const Root = () => {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    )
}

store.subscribe(Root);

AppRegistry.registerComponent('mobile', () => Root);