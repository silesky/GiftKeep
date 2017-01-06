import React from 'react';
import { View } from 'react-native';
import Swipeout from 'react-native-swipeout';
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
      text: 'delete',
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