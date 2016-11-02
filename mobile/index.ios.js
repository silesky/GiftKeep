import React, { Component } from 'react';
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
import { FriendListItem } from './components/FriendListItem';


const TopBar = ({drawerOpen}) => {
        return (
            <Header>
                <Button transparent
                onPress={() => drawerOpen()}>
                    <Icon name='ios-menu' />
                </Button>
                <Title>Gifter</Title>

                <Button transparent>
                    <Icon name='ios-settings' />
                </Button>
                <Text>GiftCard</Text>
            </Header>     
                )
}
const FriendInfo = ({friendName, bday}) => {
        return (
                 <List>
                    <ListItem>
                        <Text>{`2 months until ${friendName}'s birthday on ${bday}.`} </Text>
                    </ListItem>
               
                </List>

            )    
       }
const BottomBar = ({addFriend, addGift}) => {
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
class FriendListContainer extends Component {
    render() {
    return (
    <Container>
        <Content>
            <List>
            { store.getState().data.map((el, index)=> {
                return (
                    <FriendListItem 
                        key={index}
                        increment={() => store.dispatch(actions.increment())} 
                        friendId={el.friendId}
                        friendName={el.friendName}
                        />
                    )
            }) 
        }
            </List>
        </Content>
    </Container>
        )
    }
}
const Body = ({friendId}) => {
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
class AppContainer extends Component {
    render() {
        return (
            <Drawer
                tapToClose={true}
                openDrawerOffset={0.6 /* % gap on right side of drawer */}
                panCloseMask={0.6 /* tightly coupled ^. % of screen can be used to close (if tapToClose=true}    */}
                closedDrawerOffset={-3}
                ref={(ref) => this._drawer = ref}
                type='static'
                content={<FriendListContainer />}
                >   
                    <TopBar drawerOpen={() => this._drawer.open()} />                
                    <Body friendId={123} />
                    <BottomBar 
                    addGift={() => store.dispatch(actions.addGift(123))} 
                    addFriend={() => store.dispatch(actions.addFriend())} 
                    />
            </Drawer>);
    }
}
AppRegistry.registerComponent('mobile', () => AppContainer);