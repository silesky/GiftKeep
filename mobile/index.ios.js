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
                    onPress={() => store.dispatch(actions.addGift(123))}
                        transparent>
                    <Icon name='ios-add' />
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
const BottomBar = () => {
    return (
        <Footer>
            <FooterTab>
                <Button transparent>
                    <Icon name='ios-call' />
                      <Text>Footer HERE</Text>
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
class FriendListContainer extends Component {

    render() {
    return (
    <Container>
        <Content>
            <List>
                <FriendListItem 
                   increment={() => store.dispatch(actions.increment())} 
                   friendName='Daniel Johnston'/>
                <FriendListItem 
                   increment={() => store.dispatch(actions.increment())} 
                   friendName='Rick Ross'/>
                <FriendListItem 
                   increment={() => store.dispatch(actions.increment())} 
                   friendName='Jim Jameson'/>
            </List>
        </Content>
    </Container>
        )
    }
}
class AppContainer extends Component {
    constructor() {
      super();
      this.ComponentWillMount = () => store.dispatch(actions.addFriend("John"))
      
    }
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
                    <BottomBar />
            </Drawer>);
    }
}
AppRegistry.registerComponent('mobile', () => AppContainer);