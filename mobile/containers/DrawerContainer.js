import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';
import { Container, List, Content } from 'native-base';
import { store } from './../store';
import { FriendListItem } from './../components/FriendListItem';

export class DrawerContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
const mstp = (state) => ({state});
export default connect(mstp)(DrawerContainer)