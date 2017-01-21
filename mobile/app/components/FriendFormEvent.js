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
export const FriendFormEvent = ({

  defaultValue,
  handleOnChangeText,
  calendarModalIsVisible,
  eventDate,
  isUpdating,
  isVisible,
  onCancel,
  onEventDateInputOk,
  onEventDateInputBoxFocus,
  onEventDateInputChange
}) => (
  <View>
      <FriendFormEventNameInput 
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