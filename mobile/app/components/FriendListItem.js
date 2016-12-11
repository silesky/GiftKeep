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
      text: 'X',
      backgroundColor: 'red',
      onPress: () => onSwipeDelete(),
    },
    {
      text: 'U',
      backgroundColor: 'green',
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
