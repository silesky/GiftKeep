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
      // on first load, set the default values to the events array in redux
      friendFormEventInputs: [{}], // {eventId: null, eventDate: null, eventName: null}
    }
    this.handleEventDateInputChange = this.handleEventDateInputChange.bind(this);
    this.handleEventNameInputChange = this.handleEventNameInputChange.bind(this);
  }
  componentWillMount() {
    console.log('called');
  }
  handleEventDateInputChange(eventId, eventDateInputArg) {
    // if no event id at all
    let objectToAdd
    if (!eventId) {
      this.setState([...this.state.newFriendFormEventInput, 
      { eventId: 'create', eventName: 'unset', eventDate: eventDateInputArg }])
    } else {
     // if we're adding
      const newFriendFormEventInput = this.state.friendFormEventInputs
        .map(el => {
          if (el.eventId === eventId) {
            el.eventDate = eventDateInputArg
          } else {
            objectToAdd = {eventId: eventId, eventName: 'unset', eventDate: eventDateInputArg }
          }
          return el
        })
        // if we're adding and not updating
    if (objectToAdd) {
      this.setState({ friendFormEventInputs: [...this.state.friendFormEventInputs, objectToAdd ] })
    } else {
  // const updatingExistingEvent = !!this.state.friendFormEventInputs[eventId];

    this.setState({ friendFormEventInputs: newFriendFormEventInput }) // if updating, finish updating
    }
    }
  }
  handleEventNameInputChange(eventId, inputEventName) {
    if (!eventId) {
      this.setState([...this.state.newFriendFormEventInput, 
      { eventId: 'create', eventDate: 'unset', eventName: inputEventName }])
    } else {
      const newFriendFormEventInput = this.state.friendFormEventInputs
        .map(el => {
          if (el.eventId === eventId) {
            el.eventName = inputEventName
          }
          return el
        })
      // const updatingExistingEvent = !!this.state.friendFormEventInputs[eventId];
      this.setState({ friendFormEventInputs: newFriendFormEventInput })
    }
  }
  getEventDateInputById(eventId) {
    const foundObj = this.state.friendFormEventInputs.find(el => el.eventId === eventId);
    return foundObj.eventDate;
  }
  getEventNameInputById(eventId) {
    const foundObj = this.state.friendFormEventInputs.find(el => el.eventId === eventId)
    return foundObj.eventName;
  }
  clearState() {
    this.setState({
      friendFormEventInputs: [],
    })
  }
  render() {
    console.log(this.state.friendFormEventInputs);
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

              {events.map((eachEvent) => {
                const { eventId, eventName } = eachEvent;


                return (
                  <List key={eventId}>
                    <ListItem>
                      <Icon name='md-calendar' />
                      <FriendFormDatePicker
                        date="11-11"
                        onDateChange={(eventDateInputArg) => this.handleEventDateInputChange(eventId, eventDateInputArg)}
                        />
                      <Button>
                        Category <Icon name='ios-add-circle' />
                      </Button>
                    </ListItem>
                    <ListItem>
                      <Icon name='ios-person-outline' />
                      <Input
                        defaultValue={isUpdating ? eventName : ''}
                        onChangeText={(eventNameInputArg) => this.handleEventNameInputChange(eventId, eventNameInputArg)}
                        placeholder={isUpdating ? eventName : 'Please Enter an Event Name'}
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
                <Icon name='ios-close-circle-outline' />
              </Button>
              <Button onPress={() => {
                actions.friendFormAddEvent(friendFormUpdatingSelectedFriendId, "BLANK EVENT", "07-07");
              } }>
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
              } }>
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