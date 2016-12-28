import React from 'react';
import {
  ListItem,
  Text,
  Button,
  Title,
} from 'native-base';
import Swipeout from 'react-native-swipeout';
export const FriendListItem = ({friendName, selectFriend, onSwipeDelete, onSwipeUpdate}) => {
  const swipeoutBtns = [
    {
      type: 'delete',
      text: 'delete',
      onPress: () => onSwipeDelete(),
    },
    {
      type: 'secondary',
      text: 'edit',
      onPress: () => onSwipeUpdate(),
    },
  ]
  return (
    <Swipeout
      backgroundColor="white"
      autoClose={true}
      right={swipeoutBtns}>
      <ListItem button onPress={() => selectFriend()}>
        <Text>{friendName}</Text>
      </ListItem>
    </Swipeout>
  )
}
