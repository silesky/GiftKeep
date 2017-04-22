import React, {
  Component,
} from 'react'

import {
  connect,
} from 'react-redux'

import {
  bindActionCreators,
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
  Title,
} from 'native-base'

import {
  Header,
} from 'native-base'

import {
  FbLogin,
  FriendListItem,
} from './../components/'

import {
  LightTheme,
  colors,
} from './../themes'


import { getFriendByFriendId } from './../utils/'
class DrawerContainer extends Component {
  onSwipeDelete (friendId) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.actions.deleteFriend(friendId)
  }
  render () {
    const {
      setallFriendsVisibility,
      authTokenAndTryToGetUser,
      friendFormVisibilityToggle,
      friendFormUpdateActivate,
      selectFriend,
      clear,
    } = this.props.actions
    const { allFriendsVisibility } = this.props
    return (
      <Container>
        <Header theme={LightTheme} backgroundColor={colors.$headerFooterBg}>
          <Button transparent>{``}</Button>
          <Title style={{
            color: colors.$bigHeadingTextColor,
          }}>{this.props.drawerHeaderTitle}</Title>
          <Button
            iconRight
            onPress={() => friendFormVisibilityToggle()}
            transparent>
            <Icon name='ios-person-add'/>
          </Button>
        </Header>
        <Content theme={LightTheme}>
          <List>
          <ListItem button
            style={{
              height: 60
            }}
            onPress={() => setallFriendsVisibility(true) }
            >
                <Text style={{
                  fontSize: 20,
                  color: this.props.allFriendsColor,
                }}
                >All Friends</Text>
              </ListItem>
            {
            this.props.data.map((el, index) => (
              <FriendListItem
                isSelected={this.props.selectedFriendId === el.friendId}
                onSwipeUpdate={friendFormUpdateActivate.bind(this, el.friendId)}
                onSwipeDelete={() => this.onSwipeDelete(el.friendId)}
                selectFriend={selectFriend.bind(this, el.friendId)}
                friendName={el.friendName}
                key={index}
              />
            ))
            }


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
  actions: bindActionCreators(actions, dispatch),
})
const mstp = (state) => {
  const { friendName } = getFriendByFriendId(state, state.visible.selectedFriendId)
  const { allFriendsVisibility } = state.visible
  const drawerHeaderTitle = allFriendsVisibility
    ? 'All Gifts'
    : friendName
  return {
    allFriendsColor: allFriendsVisibility ? colors.$activeTabTextColor : 'black',
    selectedFriendId: state.visible.selectedFriendId,
    drawerHeaderTitle,
    data: state.user.data,
    userName: state.userName,
    fbImage: state.fbImage,
  }
}
export default connect(mstp, mdtp)(DrawerContainer)
