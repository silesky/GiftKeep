import React from 'react'

// [x] eachEvent should have a default object
// [ ] import from react native calendar datepicker and display
// react-native-calendar-datepicker

import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'
import {
  FriendFormDatePicker,
  FriendFormEventNameInput,
  FriendFormEventSwiper

} from './../components'
import { View } from 'react-native';
export const FriendFormEvent = (props) => {
  const {
  defaultValue,
  handleOnChangeText,
  calendarModalIsVisible,
  eventDate,
  isUpdating,
  isVisible,
  onCancel,
  onEventDateInputOk,
  onEventDateInputBoxFocus,
  onEventDateInputChange,
  isFocused
} = props;
  return (
    <View style={{paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#d4d4d4'}}>
      <FriendFormEventNameInput
      isFocused={isFocused}
      defaultValue={defaultValue}
      handleOnChangeText={(eventNameInput) => handleOnChangeText(eventNameInput)}
      />
        <FriendFormDatePicker
          calendarModalIsVisible={calendarModalIsVisible}
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