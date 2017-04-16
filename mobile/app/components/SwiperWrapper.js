import React from 'react'
import { View } from 'react-native'
import Swipeout from 'react-native-swipeout'
import * as colors from './../themes/colors'
import { SwipeIcon } from '../components/'

// types could be an array  ['edit', 'delete']
export const SwiperWrapper = ({ onSwipeDelete, onSwipeUpdate, children, fontSize = 50 }) => {

  const deleteBtn = {
    component: SwipeIcon('trash', { fontSize }, { backgroundColor: 'red' }),
    onPress: () => onSwipeDelete()
  }
  const updateBtn = {
    component: SwipeIcon('pencil', { fontSize },  { backgroundColor: 'orange'}),
    onPress: () => onSwipeUpdate()
  }

  const swipeoutBtns = (onSwipeUpdate)
  ? [ deleteBtn, updateBtn ]
  : [ deleteBtn ]

  return (
    <Swipeout
      backgroundColor={'red' /* you so there's a continuuty between delete and edit*/}
      autoClose={true}
      right={swipeoutBtns}
      >
      <View style={{ backgroundColor: 'white' }}>
        { children }
      </View>
    </Swipeout>
  )
}
