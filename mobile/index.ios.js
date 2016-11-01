import React, { Component } from 'react';
import { 
    AppRegistry
} from 'react-native';
import {
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
                <Button 
                onPress={() => drawerOpen()} 
                transparent>
                    <Icon name='ios-menu' />
                </Button>
                <Title>Gifter</Title>
                <Button 
        
                        transparent>
                    <Icon name='ios-settings' />
                </Button>
            </Header>     
                )
}
const FriendInfo = ({name, bday}) => {
        return (
            <Header>
                <Text>{`${name} | ${bday}`}</Text>
            </Header> 
            )    
       }
const BottomBar = ({addFriend, addGift}) => {
    return (
        <Footer>
            <FooterTab>
                <Button onPress={() => addFriend()} transparent>
                    <Icon name='ios-person-add' />
                </Button>  
                    <Button onPress={() => addGift() } transparent>
                    <Icon name='ios-add' />
                </Button>  
            </FooterTab>
        </Footer>
        )
}

class CardContainer extends Component {
    render() {
        return(
        <Container style={{backgroundColor: 'white'}}   > 
            <Content>
                <GiftCard />
                <GiftCard />
                <GiftCard />
            </Content>
        </Container>
        )
    }
}

//addFriendButton
class FriendListContainer extends Component {

    render() {
    return (
    <Container>
        <Content>
            <List>
            {store.getState().data.map((el, index)=> {
                return (
                    <FriendListItem 
                        increment={() => store.dispatch(actions.increment())} 
                        friendId={el.friendId}
                        friendName={el.friendName}
                        key={index}
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
                    <FriendInfo name='Nick' bday='12/25' />
                    <CardContainer />
                    <BottomBar 
                    addGift={() => store.dispatch(actions.addGift(123))} 
                    addFriend={() => store.dispatch(actions.addFriend())} 
                    />
            </Drawer>);
    }
}
AppRegistry.registerComponent('mobile', () => AppContainer);