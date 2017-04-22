import React from 'react'
import { colors } from './../themes/'
import {
  ListItem,
  Text,
} from 'native-base'
import {
  SwiperWrapper,
} from './../components'
export const FriendListItem = ({
  friendName,
  selectFriend,
  onSwipeDelete,
  onSwipeUpdate,
  isSelected
}) => {
  return (
    <SwiperWrapper
      fontSize={40}
      onSwipeUpdate={() => onSwipeUpdate()}
      onSwipeDelete={() => onSwipeDelete()}>
      <ListItem style={{height: 80}} button onPress={() => selectFriend()}>
        <Text style={{
          color: isSelected ? colors.$activeTabTextColor : 'black',
          fontSize: 20
        }}>{friendName}</Text>
      </ListItem>
    </SwiperWrapper>
  )
}
