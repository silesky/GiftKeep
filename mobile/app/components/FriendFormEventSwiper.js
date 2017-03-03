import React from 'react'
import { View } from 'react-native'
import Swipeout from 'react-native-swipeout'

import { SwipeIcon } from '../components/'

// types could be an array  ['edit', 'delete']
export const FriendFormEventSwiper = ({ onSwipeDelete, onSwipeUpdate, children }) => {
  const deleteBtn = {
    type: 'delete',
    component: SwipeIcon('trash', { fontSize: 50 }),
    onPress: () => onSwipeDelete()
  }
  const updateBtn = {
    type: 'secondary',
    component: SwipeIcon('pencil', { fontSize: 50 }),
    onPress: () => onSwipeUpdate()
  }

  const swipeoutBtns = (onSwipeUpdate)
  ? [ deleteBtn, updateBtn ]
  : [ deleteBtn ]

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
