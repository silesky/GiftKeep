import React from 'react'
import { colors } from './../themes/'
import Calendar from 'react-native-calendar-datepicker'
import Moment from 'moment'
export const FriendFormEventDatePickerCalendar = ({
    selectedEventDate,
    onEventDateInputChange
  }) => {
  const WHITE = '#FFFFFF'
  const GREY = '#BDBDBD'
  const BLACK = '#424242'
  const LIGHT_GREY = '#F5F5F5'

  return (
    <Calendar
            barView={{
              backgroundColor: colors.darkpurple,
              padding: 10
            }}
            barText={{
              fontWeight: 'bold',
              color: 'white'
            }}
            daySelectedText={{
              fontWeight: 'bold',
              backgroundColor: colors.darkpurple,
              color: WHITE,
              borderColor: 'transparent',
              overflow: 'hidden'
            }}
            selected={selectedEventDate}
            onChange={(input) => onEventDateInputChange(input)}
            startStage="month"
            minDate={Moment().startOf('day')}
        />
  )
}

//        barText={{
//               fontWeight: 'bold',
//               color: WHITE
//             }}
//             stageView={{
//               padding: 0
//             }}
//             // Day selector styling
//             dayHeaderView={{
//               backgroundColor: LIGHT_GREY,
//               borderBottomColor: GREY
//             }}
//             dayHeaderText={{
//               fontWeight: 'bold',
//               color: BLACK
//             }}
//             dayRowView={{
//               borderColor: LIGHT_GREY,
//               height: 40
//             }}
//             dayText={{
//               color: BLACK
//             }}
//             dayDisabledText={{
//               color: GREY
//             }}
//             dayTodayText={{
//               fontWeight: 'bold',
//               color: BLUE
//             }}
//             daySelectedText={{
//               fontWeight: 'bold',
//               backgroundColor: BLUE,
//               color: WHITE,
//               borderRadius: 15,
//               borderColor: 'transparent',
//               overflow: 'hidden'
//             }}
//             // Styling month selector.
//             monthText={{
//               color: BLACK,
//               borderColor: BLACK
//             }}
//             monthDisabledText={{
//               color: GREY,
//               borderColor: GREY
//             }}
//             monthSelectedText={{
//               fontWeight: 'bold',
//               backgroundColor: BLUE,
//               color: WHITE,
//               overflow: 'hidden'
//             }}
//            yearMinTintColor={BLUE}
//             yearMaxTintColor={GREY}
//             yearText={{
//               color: BLACK
//             }}
