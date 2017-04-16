import React from 'react'

import {
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
} from 'react-native'

import Moment from 'moment'

const DatePicker = Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid

export const FriendFormEventDateInput = ({
    selectedEventDate,
    onEventDateInputChange,
  }) => {
console.log('new event date:', Moment(selectedEventDate).toDate());
  return (
      <DatePicker
        date={ Moment(selectedEventDate).toDate() /* needs to be a date object */ }
        onDateChange={ (input) => onEventDateInputChange(input) }
        mode="date"
        />
  )
}
