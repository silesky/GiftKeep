import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import {
    Container,
    List,
    ListItem,
    Content,
} from 'native-base';

import { store } from './../store';
import { FriendListItem } from './../components/FriendListItem';

export class DrawerContainer extends Component {
    constructor(props) {
      super(props);
    
    }

    render() {
         console.log('store changed--  DrawerContainer inerheriting props!!', this.props);
    return (
   
    <Container>
        <Content>
            <List>
            { this.props.state.data.map((el, index)=> {
                return (

                    <FriendListItem 
                        key={index}
                        addFriend={() => store.dispatch(actions.addFriend())} 
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
