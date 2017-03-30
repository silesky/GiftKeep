
import React, {
  Component
} from 'react'
import * as actions from './../actions/'
import {
  StyleSheet,
  Modal,
  View
} from 'react-native'
import Moment from 'moment'
import {
  FriendFormEventDatePickerCalendar
} from './../components/'
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

} from  './../sporks/native-base'

export const FriendFormEventDatePicker = ({
  borderType,
  eventDate,
  calendarModalIsVisible,
  inputGroupStyle,
  onEventDateInputChange,
  onEventDateInputBoxFocus,
  onEventDateInputOk,
  onCancel,
}) => {

  return (
    <View>
      <InputGroup style={{...inputGroupStyle, marginTop: 10 }} borderType={borderType} >
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
            <FriendFormEventDatePickerCalendar
                selectedEventDate={eventDate}
                onEventDateInputChange={onEventDateInputChange}
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
FriendFormEventDatePicker.PropTypes = {
  eventWithFocus: React.PropTypes.object,
  eventDate: React.PropTypes.string,
  isVisible: React.PropTypes.bool,
  onEventDateInputChange: React.PropTypes.func,
  onEventDateInputBoxFocus: React.PropTypes.func,
  onEventDateInputOk: React.PropTypes.func,
  onCancel: React.PropTypes.func

}
