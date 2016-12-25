// [x] eachEvent should have a default object
// [ ] import from react native calendar datepicker and display
// react-native-calendar-datepicker
import Calendar from 'react-native-calendar-datepicker';


import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'

// import {
//   FriendFormDatePicker
// } from './../components/FriendFormDatePicker.js';
import * as actions from './../actions/'
import {
  // StyleSheet,
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
    this.handleEventDateInputChange = this.handleEventDateInputChange.bind(this);
    this.handleEventNameInputChange = this.handleEventNameInputChange.bind(this);
  }
  handleEventDateInputChange(eventId, eventDateInputArg) {
    this.props.actions.friendFormEventDateInputUpdate(eventId, eventDateInputArg);
  }
  handleEventNameInputChange(eventId, eventNameInputArg) {
    this.props.actions.friendFormEventNameInputUpdate(eventId, eventNameInputArg);
  }
  onFriendFormAddEventForNewFriendOrExistingFriend() {
    const { friendFormUpdatingSelectedFriendId } = this.props;
    this.props.actions.friendFormAddEvent(friendFormUpdatingSelectedFriendId, "BLANK EVENT", "07-07");
  }

  onFriendFormUpdateOrCreate() {
   const { 
      actions, 
      isUpdating, 
      friendFormUpdatingSelectedFriendId,
    } = this.props
    return (isUpdating)
      ? actions.updateFriendNameAndOrUpdateOrCreateEvents(friendFormUpdatingSelectedFriendId)
      : actions.createFriend()
  }
  render() {
    const {
      friendFormEventInput,
      friendFormIsVisible,
      // friendFormUpdatingSelectedFriendId,
      // friendFormNameInput,
      // friendFormBdayInput,
      friendName,
      // bday,
      isUpdating, //id 
      actions,
      events
    } = this.props
    
    // two events array: either from 'user reducer' state (permanant) or 'visible reducer' state (temp input)
    const whichEventArray = (isUpdating) ? events : friendFormEventInput;

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

              { 
    
                whichEventArray.map((eachEvent, eachIndex) => {
                  const { eventId, eventName } = eachEvent;
                  return (
                    <List key={eachIndex}>
              
                      {/* <ListItem>

                        <Icon name='md-calendar' />
                        <FriendFormDatePicker
                          date="11-11"
                          onDateChange={(eventDateInputArg) => this.handleEventDateInputChange(eventId, eventDateInputArg)}
                          />
                        <Button>
                          Category <Icon name='ios-add-circle' />
                        </Button>
                      </ListItem> */}
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
              <Button onPress={() => {this.onFriendFormAddEventForNewFriendOrExistingFriend()}}>
                ADD EVENT
                <Icon name='ios-calendar-outline' />
              </Button>
              <Button onPress={() => this.onFriendFormUpdateOrCreate()}>
                {(isUpdating) ? 'UPDATE' : 'CREATE'}
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
  let {
    friendFormIsUpdating,
    friendFormIsVisible,
    friendFormNameInput,
    friendFormBdayInput,
    friendFormEventInput, // [{"eventId":..., "eventDate:...", "eventName:..."}
    friendFormUpdatingSelectedFriendId
  } = state.visible;
  let {
    bday,
    events,
    friendName
  } = Utils.getFriendByFriendId(state, friendFormUpdatingSelectedFriendId);
  events = (events && events.length) ? events : [];
 
  friendFormEventInput = (friendFormEventInput && friendFormEventInput.length) ? friendFormEventInput : [{}];  // show an empty event
  return {
    isUpdating: !!(friendFormIsUpdating && friendFormUpdatingSelectedFriendId),
    bday,
    events,
    friendFormEventInput,
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