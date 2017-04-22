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
  ListItem,
  Title
} from 'native-base'

import {
  Header
} from 'native-base'

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
    const {
      setAllGiftsVisibility,
      authTokenAndTryToGetUser,
      friendFormVisibilityToggle,
      friendFormUpdateActivate,
      selectFriend,
      clear,
    } = this.props.actions
    return (
      <Container>
        <Header theme={LightTheme} backgroundColor={colors.$headerFooterBg}>
          <Button transparent>{``}</Button>
          <Title style={{
            color: colors.$bigHeadingTextColor
          }}>Friends</Title>
          <Button
            iconRight
            onPress={() => friendFormVisibilityToggle()}
            transparent>
            <Icon name='ios-person-add'/>
          </Button>
        </Header>
        <Content theme={LightTheme}>
          <List>

            {
            this.props.data.map((el, index) => (
              <FriendListItem
                onSwipeUpdate={friendFormUpdateActivate.bind(this, el.friendId)}
                onSwipeDelete={() => this.onSwipeDelete(el.friendId)}
                selectFriend={selectFriend.bind(this, el.friendId)}
                friendName={el.friendName}
                key={index}
              />
            ))
            }

          <ListItem style={{height: 80, alignSelf: 'flex-end'}} button onPress={() => setAllGiftsVisibility(true)}>
            <Text style={{fontSize: 20}}>All Friends</Text>
          </ListItem>
        </List>
        </Content>
        <Footer backgroundColor={colors.$headerFooterBg}>
          <FbLogin
            userName={this.props.userName}
            fbImage={this.props.fbImage}
            clear={clear}
            authTokenAndTryToGetUser={authTokenAndTryToGetUser}/>
        </Footer>
      </Container>

    )
  }
}

const mdtp = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})
const mstp = (state) => {
  return {
    data: state.user.data,
    userName: state.userName,
    fbImage: state.fbImage,
  }
}
export default connect(mstp, mdtp)(DrawerContainer)
