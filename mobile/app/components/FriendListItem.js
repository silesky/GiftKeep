import React from 'react';
import { View } from 'react-native';
import {
  ListItem,
  Text,
  Button,
  Title,
  Container,
  Icon,
} from 'native-base';

import Swipeout from 'react-native-swipeout';


export const FriendListItem = ({friendName, selectFriend, onSwipeDelete, onSwipeUpdate}) => {

  const swipeoutBtns = [
    {
      type: 'delete',
      component: [<Icon key={1} style={{alignSelf: 'center', marginTop: 7 }} name="ios-trash-outline" />],
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
      right={swipeoutBtns}
    >
      <ListItem button onPress={() => selectFriend()}>
        <Text>{friendName}</Text>
      </ListItem>
    </Swipeout>
  )
}
