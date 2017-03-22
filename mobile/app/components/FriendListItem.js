import React from 'react'
import {
  ListItem,
  Text,
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
      fontSize={30}
      onSwipeUpdate={() => onSwipeUpdate()}
      onSwipeDelete={() => onSwipeDelete()}>
      <ListItem style button onPress={() => selectFriend()}>
        <Text>{friendName}</Text>
      </ListItem>
    </SwiperWrapper>
  )
}
