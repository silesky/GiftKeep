import React from 'react'
import { View } from 'react-native'
import Moment from 'moment'
import { ModalDrawerCardWrapper, EventDatePicker } from './../components/'
import {
  Input,
  InputGroup,
  Icon,
} from 'native-base'

export const FriendFormEventDateInput = ({
  borderType,
  eventDate,
  friendFormEventDatePickerIsVisible,
  inputGroupStyle,
  onEventDateInputChange,
  onEventDateInputBoxFocus,
  onEventDateInputOk,
  onCancel,
}) => {
  return (
    <View>
      <InputGroup
        style={{
          ...inputGroupStyle,
          marginTop: 10,
        }}
        borderType={borderType}>
        <Input
          placeholder='Click to add a friend event.'
          selectionColor='white'
          editable={false}
          value={Moment(eventDate).format('MM-DD-YYYY')}
          onFocus={() => onEventDateInputBoxFocus()}/>
        <Icon name='md-calendar'/>
      </InputGroup>
      <ModalDrawerCardWrapper
        title='Select Event'
        iconName='md-calendar'
        isVisible={friendFormEventDatePickerIsVisible}
        onCancel={() => onCancel()}
        onSubmit={() => onEventDateInputOk()}>
        <EventDatePicker
          selectedEventDate={eventDate}
          onEventDateInputChange={onEventDateInputChange}/>
      </ModalDrawerCardWrapper>
    </View>
  )
}
FriendFormEventDateInput.PropTypes = {
  eventWithFocus: React.PropTypes.object,
  eventDate: React.PropTypes.string,
  isVisible: React.PropTypes.bool,
  onEventDateInputChange: React.PropTypes.func,
  onEventDateInputBoxFocus: React.PropTypes.func,
  onEventDateInputOk: React.PropTypes.func,
  onCancel: React.PropTypes.func,

}
