import React from 'react'

import {
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
} from 'react-native'

import Moment from 'moment'

const DatePicker = Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid

export const FriendFormEventDatePicker = ({
    selectedEventDate,
    onEventDateInputChange,
  }) => {
  return (
      <DatePicker
        minimumDate={new Date()}
        date={Moment(selectedEventDate).toDate()}
        onDateChange={ (input) => onEventDateInputChange(input) }
        mode="date"
        />
  )
}
