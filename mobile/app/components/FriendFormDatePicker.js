import Calendar from 'react-native-calendar-datepicker';
import React, {
  Component
} from 'react';

import * as actions from './../actions/'
import {
  // StyleSheet,
  Modal,
  View
} from 'react-native';
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

} from 'native-base';
  // <Modal
  //   visible={isVisible}
  //   animationType={'fade'}
  //   transparent={true}
  //   >
    // </Modal>
export const FriendFormDatePicker = ({ 
eventDate,
isVisible, 
handleEventDateInputChange

}) => (

  <View>
    <Calendar
      defaultValue={eventDate}
      selected={eventDate}
      onChange={(eventDateInputArg) => handleEventDateInputChange(eventDateInputArg)}
      />

  </View>
)             

console.log('hello!');