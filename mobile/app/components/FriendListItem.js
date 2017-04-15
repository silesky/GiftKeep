import React from 'react'
import {
  ListItem,
  Text,
  Content
} from './../sporks/native-base'
import {
  SwiperWrapper,
} from './../components'
export const FriendListItem = ({
  friendName,
  selectFriend,
  onSwipeDelete,
  onSwipeUpdate,
}) => {
  return (
    <SwiperWrapper
      fontSize={40}
      onSwipeUpdate={() => onSwipeUpdate()}
      onSwipeDelete={() => onSwipeDelete()}>
      <ListItem style={{height: 80}} button onPress={() => selectFriend()}>
        <Text style={{fontSize: 20}}>{friendName}</Text>
      </ListItem>
    </SwiperWrapper>
  )
}
