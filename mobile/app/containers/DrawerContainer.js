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
  View,
} from 'react-native'

import {
  Text,
  Container,
  Content,
  Footer,
  List,
  ListItem,
} from 'native-base'

import {
  Header,
} from 'native-base'

import {
  FbLogin,
  FriendListItem,
  DrawerHeader,
} from './../components/'

import {
  LightTheme,
  colors
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
    const { allFriendsVisibility, allFriendsColor } = this.props
    return (
      <Container>
      {/* extra wrapping view because header won't display otherwise */}
        <View>
          <DrawerHeader
            drawerHeaderTitle={this.props.drawerHeaderTitle}
            friendFormVisibilityToggle={friendFormVisibilityToggle}
           />
           </View>
        <Content>
          <List>
            <View style={{
              backgroundColor: allFriendsColor.backgroundColor,
            }}>
            <ListItem button style={{height: 60}}
              onPress={() => setallFriendsVisibility(true) }
              >
                  <Text style={{
                    fontSize: 20,
                    color: allFriendsColor.color
                  }}
                  >All Friends</Text>
                </ListItem>
           </View>
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
    ? 'All Friends'
    : friendName

  const createColors = (color, backgroundColor) => ({ color, backgroundColor })
  return {
    allFriendsColor: allFriendsVisibility
      ? createColors(colors.$tabTextColorActive, colors.$tabBgActive)
      : createColors(colors.$tabTextColorInactive, colors.$tabBgInactive),
    selectedFriendId: state.visible.selectedFriendId,
    drawerHeaderTitle,
    data: state.user.data,
    userName: state.userName,
    fbImage: state.fbImage,
  }
}
export default connect(mstp, mdtp)(DrawerContainer)
