import React,  { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './../actions/'
import { 
  Image, 
  StyleSheet, 
  View
} from 'react-native';

import {
  Thumbnail,
  Button,
  Text,
  Container,
  Content,
  Footer,
  Header,
  List,
  Title
} from 'native-base';

import { 
  FbLogin,
  FriendListItem 
} from './../components/'


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
            {
              this.props.state.user.data.map((el, index) => (
              <FriendListItem
                onSwipeUpdate={this.props.actions.friendFormUpdateActivate.bind(this, el.friendId)}
                onSwipeDelete={this.props.actions.deleteFriend.bind(this, el.friendId)}
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
            userName={this.props.state.user.userName} 
            fbImage={this.props.state.user.fbImage} 
            clear={this.props.actions.clear}
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