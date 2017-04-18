import React, {Component} from 'react'
import * as actions from './../actions/'
import {StyleSheet, Modal, View} from 'react-native'
import Moment from 'moment'
import {ModalDrawerCardWrapper, FriendFormEventDatePicker} from './../components/'
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Input,
  InputGroup,
  List,
  ListItem,
  Text,
  Button,
  Title,
  Icon,
  Card,
  CardItem

} from 'native-base'

export const FriendFormEventDateInput = ({
  borderType,
  eventDate,
  friendFormEventDatePickerIsVisible,
  inputGroupStyle,
  onEventDateInputChange,
  onEventDateInputBoxFocus,
  onEventDateInputOk,
  onCancel
}) => {

  return (
    <View>
      <InputGroup
        style={{
        ...inputGroupStyle,
        marginTop: 10
      }}
        borderType={borderType}>
        <Input
          placeholder="Click to add a friend event."
          selectionColor={'white'}
          editable={false}
          value={Moment(eventDate).format('MM-DD-YYYY')}
          onFocus={() => onEventDateInputBoxFocus()}/>
        <Icon name="md-calendar"/>
      </InputGroup>
      <ModalDrawerCardWrapper
        title="Select an Event Date."
        iconName="md-calendar"
        isVisible={friendFormEventDatePickerIsVisible}
        onCancel={() => onCancel()}
        onSubmit={() => onEventDateInputOk()}>
        <FriendFormEventDatePicker
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
  onCancel: React.PropTypes.func

}
