import React from 'react';

import { View, StyleSheet } from 'react-native';
import {
  ListItem,
  Text,
  Button,
  Title,
  Container,

} from 'native-base';
import { EI as Icon } from './../icons';
import Swipeout from 'react-native-swipeout';
import { SwipeIcon } from './../components';

export const FriendListItem = ({ friendName, selectFriend, onSwipeDelete, onSwipeUpdate }) => {
  const swipeoutBtns = [
    {
      type: 'delete',
      component: SwipeIcon('trash', {fontSize: 30}),
      onPress: () => onSwipeDelete(),
    },
    {
      type: 'secondary',
      component: SwipeIcon('pencil', {fontSize: 30}),
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