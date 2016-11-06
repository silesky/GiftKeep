import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from './../actions/actions';
import { Container, List, Content, Header, Title } from 'native-base';
import { FriendListItem } from './../components/FriendListItem';

export class DrawerContainer extends Component {
  constructor(props) {
    super(props);
  }
  const
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
                        selectFriend={this.props.actions.selectFriend.bind(this, el.friendId)} 
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


const mdtp = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = (state) => ({state});
export default connect(mstp, mdtp)(DrawerContainer)