import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'
import * as actions from './../actions/'

import {
  LayoutAnimation,
} from 'react-native'

import {
  Thumbnail,
  Button,
  Text,
  Container,
  Content,
  Footer,
  List,
  Icon,
  Title
} from './../sporks/native-base'

import {
  Header
} from './../sporks/native-base'
import {
  FbLogin,
  FriendListItem
} from './../components/'

import {
  LightTheme
} from './../themes'
import colors from './../themes/colors'
class DrawerContainer extends Component {
  onSwipeDelete (friendId) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.actions.deleteFriend(friendId)
  }
  render () {
    return (
      <Container>
        <Header theme={LightTheme} backgroundColor={colors.$headerFooterBg}>
          <Button transparent>{``}</Button>
          <Title style={{
            color: colors.$bigHeadingTextColor
          }}>Friends</Title>
          <Button
            iconRight
            onPress={() => this.props.actions.friendFormVisibilityToggle()}
            transparent>
            <Icon name='ios-person-add'/>
          </Button>
        </Header>
        <Content theme={LightTheme}>
          <List>
            {this.props.state.user.data.map((el, index) => (
              <FriendListItem
                onSwipeUpdate={this.props.actions.friendFormUpdateActivate.bind(this, el.friendId)}
                onSwipeDelete={() => this.onSwipeDelete(el.friendId)}
                selectFriend={this.props.actions.selectFriend.bind(this, el.friendId)}
                friendName={el.friendName}
                key={index}
              />
            ))
}
          </List>
        </Content>
        <Footer backgroundColor={colors.$headerFooterBg}>
          <FbLogin
            userName={this.props.state.user.userName}
            fbImage={this.props.state.user.fbImage}
            clear={this.props.actions.clear}
            authTokenAndTryToGetUser={this.props.actions.authTokenAndTryToGetUser}/>
        </Footer>
      </Container>

    )
  }
}

const mdtp = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})
const mstp = (state) => ({
  state
})
export default connect(mstp, mdtp)(DrawerContainer)
