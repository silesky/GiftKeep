import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/actions';
import { Container, List, Content, Header, Title } from 'native-base';
import { store } from './../stores/store';
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
              <Header>
                <Title>Friends</Title>
              </Header>
            { this.props.state.user.data.map((el, index) => (
                    <FriendListItem 
                        key={index}
                        selectFriend={() => store.dispatch(actions.selectFriend(el.friendId))} 
                        friendName={el.friendName}
                      />
              )) 
        }
            </List>
        </Content>
    </Container>
    )
  }

}
const mstp = (state) => ({state});
export default connect(mstp)(DrawerContainer)