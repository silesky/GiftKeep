import React from 'react';
import { View } from 'react-native';
import Swipeout from 'react-native-swipeout';

import { SwipeIcon } from '../components/';
import {
  Card,
  ListItem,
  List,
  CardItem
} from 'native-base';
export const FriendFormEventSwiper = ({ onSwipeDelete, children }) => {
  const swipeoutBtns = [
    {
      type: 'delete',
      component: SwipeIcon('trash', {fontSize: 50, marginTop: 45}),
      onPress: () => onSwipeDelete(),
    }
  ]
  return (
    <Swipeout
      backgroundColor="white"
      autoClose={true}
      right={swipeoutBtns}
      >
    <CardItem>
      { children }
      </CardItem>
    </Swipeout>
  )
}