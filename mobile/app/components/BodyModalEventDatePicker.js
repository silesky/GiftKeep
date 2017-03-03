import React from 'react'
import Calendar from 'react-native-calendar-datepicker'
import Moment from 'moment'
import { View } from 'react-native'
import { ListItem, Button } from 'native-base'
export const BodyModalEventDatePicker = ({
  calendarModalIsVisible,
  onEventDateInputChange,
  onEventDateInputBoxFocus,
  onEventDateInputOk,
  onCancel
}) => {
  return (
      <View>
              <Calendar
                minDate={Moment().startOf('day')}
                maxDate={Moment().add(10, 'years').startOf('day')}
                style={{ width: 100 }}
                onChange={(eventDateInputArg) => onEventDateInputChange(eventDateInputArg)}
                />
            </View>
  )
}
