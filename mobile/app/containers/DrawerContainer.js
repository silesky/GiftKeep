import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './../actions/actions'
import { Image } from 'react-native';
import {
  Button,
  Text,
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
    const { userName, fbImage } = this.props.state.user;
    return (
      <Container>
        <Header>
          <Title>Friends</Title>
        </Header>
        <Content>
          <Text>{ userName }</Text>
          <Image source={{ uri: fbImage, width: 25, height: 25, scale: 3 }} />
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