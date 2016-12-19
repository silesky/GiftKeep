import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'

import {
  FriendFormDatePicker
} from './../components/FriendFormDatePicker.js';
import * as actions from './../actions/'
import {
  StyleSheet,
  Modal
} from 'react-native';
import {
  Thumbnail,
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



import * as Utils from './../utils/utils'


class FriendFormCreateUpdate extends Component {
  constructor(props) {
    super(props);
    // eventTitleInput should be an array, since there are mulitple values
    this.state = {
      friendFormEventInputs: {}
    }
  }


  handleEventDateInputChange(eventId, inputEventDate) {
    // const updatingExistingEvent = !!this.state.friendFormEventInputs[eventId];
    this.setState({
      friendFormEventInputs: [
        ...this.state.friendFormEventInputs, {
          inputEventDate: inputEventDate,
          eventId: eventId
            //inputEventName: inputEventName
        } 
        ]
    })
  }
  handleEventNameInputChange(eventId, inputEventName) {
    console.log('handleEventDateInputChange', eventId, inputEventName);
    // const updatingExistingEvent = !!this.state.friendFormEventInputs[eventId];
    this.setState({
      friendFormEventInputs: {...this.state.friendFormEventInputs,
        [eventId]: {
          inputEventName: inputEventName
            //inputEventName: inputEventName
        }
      }
    })
  }
  clearState() {
    this.setState({
      friendFormEventInputs: {}
    })
  }
  render() {
    const {
      friendFormIsVisible,
      friendFormUpdatingSelectedFriendId,
      friendFormNameInput,
      friendFormBdayInput,
      friendName,
      bday,
      isUpdating, //id 
      actions,
      events
    } = this.props

    const {
      friendFormEventInputs
    } = this.state;

    return (
      <Modal
        visible={friendFormIsVisible}
        animationType={'slide'}
        transparent={false}
        >
        <Container style={{ height: 50 }}>
          <Header>
            <Button transparent>
              <Text></Text>
            </Button>
            <Title>{isUpdating ? `Update ${friendName}` : `Create Friend`}
            </Title>
          </Header>
          <Content>
            <List>
              <ListItem>
                <InputGroup>
                  <Icon name='ios-person' />

                  <Input
                    defaultValue={isUpdating ? friendName : ''}
                    onChangeText={(input) => actions.friendFormNameInputUpdate(input)}
                    placeholder={isUpdating ? friendName : 'Please Enter a Name'}
                    placeholderTextColor='#c9c9c9' />
                </InputGroup>
              </ListItem>
              
           { events.map((eachEvent) => {
              const { eventId, eventDate, eventName } = eachEvent;
              const stateEventDate = (friendFormEventInputs.hasOwnProperty(eventId))
                ? friendFormEventInputs[eventId].inputEventDate
                : "01-01";
              const stateEventName = (friendFormEventInputs.hasOwnProperty(eventName))
                ? friendFormEventInputs[eventId].inputEventName
                : "Your event name.";

              return (
              <List key={eventId}>
                  <ListItem>
                    <Icon name='md-calendar' />
                    <FriendFormDatePicker

                      date={isUpdating ? stateEventDate : "11-11"}
                      placeholder={isUpdating ? `date: ${stateEventDate}, eventName: ${eventName}` : 'Add a special date.'}
                      onDateChange={(inputEventDate) => this.handleEventDateInputChange(eventId, inputEventDate)}
                    />
                    <Button>
                    Category <Icon name='ios-add-circle' />
                    </Button>
                    </ListItem>
                    <ListItem>
                      <Icon name='ios-person-outline' />
                      <Input
                        defaultValue={isUpdating ? eventName : ''}
                        onChangeText={(inputEventName) => this.handleEventNameInputChange(eventId, inputEventName)}
                        placeholder={isUpdating ? stateEventName : 'Please Enter an Event Name'}
                        placeholderTextColor='#c9c9c9' />
                    </ListItem>
                    </List>

              )
            })
          }

            </List>
          </Content>
          <Footer>
            <FooterTab>
               <Button onPress={() => actions.friendFormCancelUpdateOrCreate()}>
                 CANCEL
                <Icon name='ios-close-circle-outline'/>
              </Button>
              <Button onPress={() => {
                  actions.friendFormAddEvent(friendFormUpdatingSelectedFriendId, "BLANK EVENT", "07-07" );
              }}>
                ADD EVENT
                <Icon name='ios-calendar-outline' />
              </Button>
              <Button onPress={() => {
                return (isUpdating)
                      ? actions.updateFriend(
                          friendFormUpdatingSelectedFriendId, 
                          friendFormNameInput, 
                          friendFormEventInputs
                        )
                      : actions.createFriend(friendFormNameInput, friendFormEventInputs)
                    }}>
                {(isUpdating) ? 'UPDATE' : 'CREATE'} {/* Button Title */}
                <Icon name='ios-checkbox-outline' />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Modal>
    );
  }
}

/* onRequestClose={() => friendFormVisibilityToggle()}  mandatory android prop*/

const mstp = (state) => {
  const {
    friendFormIsUpdating,
    friendFormIsVisible,
    friendFormNameInput,
    friendFormBdayInput,
    friendFormUpdatingSelectedFriendId
  } = state.visible;
  let {
    bday,
    events,
    friendName
  } = Utils.getFriendByFriendId(state, friendFormUpdatingSelectedFriendId);
  events = events && events.length ? events : [];
  return {
    isUpdating: !!(friendFormIsUpdating && friendFormUpdatingSelectedFriendId),
    bday,
    events,
    friendName,
    friendFormIsVisible,
    friendFormNameInput,
    friendFormBdayInput,
    friendFormUpdatingSelectedFriendId
  }
};
const mdtp = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mstp, mdtp)(FriendFormCreateUpdate)