import React from 'react'

// [x] eachEvent should have a default object
// [ ] import from react native calendar datepicker and display
// react-native-calendar-datepicker
import { Card } from 'native-base'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'
import {
  FriendFormEventDateInput,
  FriendFormEventNameInput,
  SwiperWrapper

} from './../components'
import { View } from 'react-native'

import { colors } from './../themes/'
export const FriendFormEvent = ({
  eventName,
  handleOnChangeText,
  friendFormEventDatePickerIsVisible,
  eventDate,
  isUpdating,
  isVisible,
  onCancel,
  onEventDateInputOk,
  onEventDateInputBoxFocus,
  onEventDateInputChange,
  isFocused,
}) => {
  const inputGroupStyle = {
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
  }
  const borderType = 'rounded'
  return (
    <View style={{
      paddingBottom: 10,
      paddingTop: 10,
      borderBottomWidth: 0.5,
      backgroundColor: colors.$friendFormEventCardBackgroundColor,
      borderBottomColor: colors.$shadowBorder,
     }}>
       <FriendFormEventNameInput
        inputGroupStyle={inputGroupStyle}
        borderType={borderType}
        isFocused={isFocused}
        eventName={eventName}
        handleOnChangeText={(eventNameInput) => handleOnChangeText(eventNameInput)}
        />
        <FriendFormEventDateInput
          inputGroupStyle={inputGroupStyle}
          borderType={borderType}
          friendFormEventDatePickerIsVisible={friendFormEventDatePickerIsVisible}
          eventDate={eventDate}
          isUpdating={isUpdating}
          isVisible={isVisible}
          onCancel={() => onCancel()}
          onEventDateInputOk={() => onEventDateInputOk()}
          onEventDateInputBoxFocus={() => onEventDateInputBoxFocus()}
          onEventDateInputChange={(eventDateInput) => onEventDateInputChange(eventDateInput)}
        />
     </View>
  )
}
