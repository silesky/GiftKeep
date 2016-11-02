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
    render() {
    return (
    <Container>
        <Content>
            <List>
            { store.getState().data.map((el, index)=> {
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
const mapStateToProps = (state) => ({state})
export default connect(mapStateToProps)(DrawerContainer)