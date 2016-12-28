// [x] eachEvent should have a default object
// [ ] import from react native calendar datepicker and display
// react-native-calendar-datepicker
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
 } from './../components'
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

  onfriendFormEventCreateForNewFriendOrExistingFriend() {
    const { friendFormUpdatingSelectedFriendId } = this.props;
    this.props.actions.friendFormEventCreate(friendFormUpdatingSelectedFriendId, undefined, undefined); // default eventName, default eventDate     // uses default params
  }

  onFriendFormUpdateOrCreate() {
    const {
      actions,
      isUpdating,
      friendFormUpdatingSelectedFriendId,
    } = this.props
    return (isUpdating)
      ? actions.friendFormUpdateAndSave(friendFormUpdatingSelectedFriendId)
      : actions.friendFormCreateAndSave()
  }
  render() {
    const {
      friendFormEventDatePickerIsVisible,
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
              <InputGroup>
                <Input
                  defaultValue={isUpdating ? friendName : ''}
                  onChangeText={(input) => actions.friendFormFriendNameInputUpdate(input)}
                  placeholder={isUpdating ? friendName : 'Please Enter a Name'}
                  placeholderTextColor='#c9c9c9'
                  />
                <Icon name="ios-person" />
              </InputGroup>
              {
                whichEventArray.map((eachEvent, eachIndex) => {
                  const { eventId, eventName, eventDate } = eachEvent;
                  return (
                    <View key={eachIndex}>
                      <InputGroup>
                        <Icon name="md-happy" />
                        <Input
                          defaultValue={isUpdating ? eventName : ''}
                          onChangeText={(eventNameInputArg) => this.handleEventNameInputChange(eventId, eventNameInputArg)}
                          placeholder='Birthday, graduation, anniversary...'
                          placeholderTextColor='#c9c9c9'
                          />
                      </InputGroup>
                      <FriendFormDatePicker
                        isVisible={friendFormEventDatePickerIsVisible}
                        eventDate={eventDate}
                        handleEventDateInputChange={this.handleEventDateInputChange.bind(this, eventId)}
                      />
                    </View>


                  )
                })
              }
            </List>
          </Content>
          <Footer>

            <FooterTab>
              <Button onPress={() => actions.friendFormCancel()}>
                CANCEL
                <Icon name='ios-close-circle-outline' />
              </Button>
              <Button onPress={() => { this.onfriendFormEventCreateForNewFriendOrExistingFriend() } }>
                ADD EVENT
                    <Icon name='ios-calendar-outline' /> {/* it seems that you can't add custom icons here*/}
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
    friendFormEventDatePickerIsVisible,
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
    friendFormEventDatePickerIsVisible,
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