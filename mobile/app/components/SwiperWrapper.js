import React from 'react'
import { View } from 'react-native'
import Swipeout from 'react-native-swipeout'
import * as colors from './../themes/colors'
import { SwipeIcon } from '../components/'

// types could be an array  ['edit', 'delete']
export const SwiperWrapper = ({ onSwipeDelete, onSwipeUpdate, children, fontSize = 50 }) => {

  const deleteBtn = {
    type: 'delete',
    component: SwipeIcon('trash', { fontSize }),
    onPress: () => onSwipeDelete()
  }
  const updateBtn = {
    type: 'secondary',
    component: SwipeIcon('pencil', { fontSize }),
    onPress: () => onSwipeUpdate()
  }

  const swipeoutBtns = (onSwipeUpdate)
  ? [ deleteBtn, updateBtn ]
  : [ deleteBtn ]

  return (
    <Swipeout
      backgroundColor={colors.electricBlue}
      autoClose={true}
      right={swipeoutBtns}
      >
      <View style={{backgroundColor: 'white'}}>{ children }</View>
    </Swipeout>
  )
}
