import Calendar from 'react-native-calendar-datepicker'
import React, {
  Component
} from 'react'

import * as actions from './../actions/'
import {
  StyleSheet,
  Modal,
  View
} from 'react-native'
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
import Moment from 'moment'
export const FriendFormDatePicker = ({
  eventDate,
  calendarModalIsVisible,
  onEventDateInputChange,
  onEventDateInputBoxFocus,
  onEventDateInputOk,
  onCancel
}) => {
  return (
    <View>
      <InputGroup style={{ paddingLeft: 10, marginLeft: 5, marginRight: 5 }} borderType="rounded" >
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
        <Content>
          <Card
            style={{
              marginTop: 30,
              backgroundColor: 'white'
            }}>
            <CardItem header>
              <Icon name="md-calendar" />
              <Text>Select an Event Date</Text>
            </CardItem>
            <CardItem cardBody>

              <Calendar
                startStage="month"
                minDate={Moment().startOf('day')}
                maxDate={Moment().add(10, 'years').startOf('day')}
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
