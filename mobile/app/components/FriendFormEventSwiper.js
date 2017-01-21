import React from 'react';
import { View } from 'react-native';
import Swipeout from 'react-native-swipeout';

import { SwipeIcon } from '../components/';

export const FriendFormEventSwiper = ({ onSwipeDelete, children }) => {
  const swipeoutBtns = [
    {
      type: 'delete',
      component: SwipeIcon('trash', {fontSize: 50}),
      onPress: () => onSwipeDelete(),
    }
  ]
  return (
    <Swipeout
      backgroundColor="white"
      autoClose={true}
      right={swipeoutBtns}
      >
      <View>{ children }</View>
    </Swipeout>
  )
}