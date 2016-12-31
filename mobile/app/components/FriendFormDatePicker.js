import Calendar from 'react-native-calendar-datepicker';
import React, {
  Component
} from 'react';

import * as actions from './../actions/'
import {
  StyleSheet,
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
  Card,
  CardItem

} from 'native-base';
import Moment from 'moment';
export const FriendFormDatePicker = ({
  isUpdating,
  eventDate,
  calendarModalIsVisible,
  //eventWithFocus,
  isVisible,
  onEventDateInputChange,
  onEventDateInputBoxFocus,
  onEventDateInputOk,
  onCancel,
}) => {
  const 
    eventMonth = Moment(eventDate).format('M')
    , eventDay =  Moment(eventDate).format('D')
    , eventYear =  Moment(eventDate).format('Y')
    , eventTimeFromNow = Moment(eventDate).fromNow()
;
  const isEventInTheFuture = Moment(eventDate).format('YYYYMMDD') > Moment().format('YYYYMMDD')

//const dateToDisplay = (isEventInTheFuture) ? eventTimeFromNow : '';
  return (
    <View>
      <InputGroup>
        <Input
          placeholder="Click to add a friend event."
          selectionColor={'white'}
          editable={false}
          value={Moment(eventDate).format('MM-DD-YYYY')}
          onFocus={() => onEventDateInputBoxFocus()}
          />
        <Icon name="md-calendar" />
      </InputGroup>

      <Modal
        visible={calendarModalIsVisible}
        animationType={'fade'}
        transparent={true}
        >
        <Container>
        <Content>
          <Card
            style={{
              marginTop: 30,
              backgroundColor: 'white',
            }}>
            <CardItem header>
              <Icon name="md-calendar" />
              <Text>Select an Event Date</Text>
            </CardItem>
            <CardItem cardBody>
              <Calendar
                selected={eventDate}
                onChange={(eventDateInputArg) => onEventDateInputChange(eventDateInputArg)}
                />
            </CardItem>
            <CardItem footer>
              <Button style={{ alignSelf: 'center' }} danger
                onPress={() => onCancel()}>
                CANCEL
            </Button>
              <Button style={{ alignSelf: 'center' }} success
                onPress={() => onEventDateInputOk()}>
                OK
              </Button>
            </CardItem>
          </Card>
        </Content>
        </Container>

      </Modal>


    </View>
  )
}
FriendFormDatePicker.PropTypes = {
  eventWithFocus: React.PropTypes.object,
  eventDate: React.PropTypes.string,
  isVisible: React.PropTypes.bool,
  onEventDateInputChange: React.PropTypes.func,
  onEventDateInputBoxFocus: React.PropTypes.func,
  onEventDateInputOk: React.PropTypes.func,
  onCancel: React.PropTypes.func

}
