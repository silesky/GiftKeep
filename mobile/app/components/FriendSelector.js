import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, View, LayoutAnimation } from 'react-native'
import {
  Text,
  List,
  Button,
  Card,
  CardItem,
  Icon,
 } from 'native-base'
import * as actions from './../actions/'
class FriendSelector extends React.Component {
  constructor (props) {
    super(props)
    this.toggleFriendSelectorVisibility = this.toggleFriendSelectorVisibility.bind(
    this
    )
    this.state = {
      friendSelectorIsVisible: false,
    }
  }
  toggleFriendSelectorVisibility () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      friendSelectorIsVisible: !this.state.friendSelectorIsVisible,
    })
  }
  handleSelectFriend (friendId) {
    this.props.actions.selectFriend(friendId)
    setTimeout(this.toggleFriendSelectorVisibility, 100)
  }
  render () {
    const { friendList, selectedFriendId, selectedFriendName } = this.props
    const btnStyle = !!selectedFriendId
    ? {backgroundColor: 'blue'}
    : {backgroundColor: 'orange'}
    return (
      <View style={styles.wrapper}>
        <Button style={btnStyle} onPress={() => this.toggleFriendSelectorVisibility()}>
            <Icon
            name='ios-person-add'
            />
        </Button>
        {this.state.friendSelectorIsVisible &&
          <View style={styles.container}>
            <List style={styles.list}>
              {friendList.map(({ friendId, friendName }) => {
                const isSelected = friendId === selectedFriendId
                const checkBox = isSelected
                  ? <Icon name="ios-checkbox-outline"/>
                  : <Icon name="ios-square-outline" />
                return (
                  <Card
                    key={friendId}
                    style={styles.listItem}
                  >
                  <CardItem button onPress={() => this.handleSelectFriend(friendId)}>
                   { checkBox }
                    <Text>{friendName}</Text>
                  </CardItem>
                  </Card>
                )
              })}
            </List>
          </View>}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  wrapper: {

  },
  container: {
    position: 'absolute',
    zIndex: 999,
    width: 200,
    left: -40,
  },
  list: {
    paddingRight: 2,
  },
  listItem: {
    marginLeft: 2,
  },
})

const mstp = state => {
  const friendList = state.user.data.map(el => ({
    friendId: el.friendId,
    friendName: el.friendName,
  }))
  const { selectedFriendId } = state.visible
  const friendNameObj = friendList.find(
    ({ friendId }) => friendId === selectedFriendId
  )
  const selectedFriendName = friendNameObj && friendNameObj.friendName
  return {
    selectedFriendId: state.visible.selectedFriendId,
    selectedFriendName: selectedFriendName || 'Select a Friend!',
    friendList,
    friendSelectorIsVisible: state.visible.friendSelectorIsVisible,
  }
}

const mdtp = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

const connected = connect(mstp, mdtp)(FriendSelector)
export { connected as FriendSelector }
