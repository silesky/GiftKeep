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

export const FriendFormDatePicker = ({
  eventDate,
  isVisible,
  onEventDateInputChange,
  onEventDateInputBoxFocus,
  onEventDateInputOk,
  onCancel,
}) => (
    <View>
      <InputGroup>
        <Input
          selectionColor={'white'}
          editable={false}
          value={eventDate.toString()}
          onFocus={() => onEventDateInputBoxFocus()}
          />
        <Icon name="md-calendar" />
      </InputGroup>

      <Modal
        visible={isVisible}
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
              <Text>Select an Event</Text>
            </CardItem>
            <CardItem cardBody>
              <Calendar
                defaultValue={eventDate}
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
const styles = StyleSheet.create({
  // footerCard: {
  //     flex: 1,
  //     alignItems: 'center',
  //     paddingTop: 5,
  //     paddingBottom: 5,

  // },
  // button: {
  //   backgroundColor: 'purple'
  // },
})
