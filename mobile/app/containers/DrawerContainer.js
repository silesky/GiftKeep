import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './../actions/actions'
import {
  Button,
  Container,
  Content,
  Footer,
  Header,
  List,
  Title
} from 'native-base';
import { FbLogin } from './../components/FbLogin'
import { FriendListItem } from './../components/FriendListItem'

export class DrawerContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Friends</Title>
        </Header>
        <Content>
          <List>
            {this.props.state.user.data.map((el, index) => (
              <FriendListItem
                deleteFriend={this.props.actions.deleteFriend.bind(this, el.friendId)}
                selectFriend={this.props.actions.selectFriend.bind(this, el.friendId)}
                friendName={el.friendName}
                key={index}
                />
            ))
            }
          </List>
        </Content>
        <Footer>
          <FbLogin 
          authTokenAndTryToGetUser={this.props.actions.authTokenAndTryToGetUser}
          />
        </Footer>
      </Container>

    )
  }

}


const mdtp = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
const mstp = (state) => ({ state });
export default connect(mstp, mdtp)(DrawerContainer)