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
      text: 'x',
      backgroundColor: 'red',
      onPress: () => onSwipeDelete(),
    },
    {
      text: 'edit',
      backgroundColor: 'orange',
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
