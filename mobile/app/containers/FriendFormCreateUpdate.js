// [x] eachEvent should have a default object
// [ ] import from react native calendar datepicker and display
// react-native-calendar-datepicker
import { LightTheme, themeList } from './../themes/'
import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'
import {
  SwiperWrapper,
  FriendFormEvent,
  FriendFormNameInput,
  ListItemDivider
 } from './../components'
import * as actions from './../actions/'
import {
  // StyleSheet,
  Modal
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
  Icon
} from 'native-base'
import * as colors from './../themes/colors'
import { overrides } from './../themes/'
import * as Utils from './../utils/utils'

class FriendFormCreateUpdate extends Component {
  constructor (props) {
    super(props)
    // eventTitleInput should be an array, since there are mulitple values
    this.handleEventDateInputChange = this.handleEventDateInputChange.bind(this)
    this.handleEventNameInputChange = this.handleEventNameInputChange.bind(this)
    this.onEventDateInputBoxFocus = this.onEventDateInputBoxFocus.bind(this)
  }

  handleCreateOrUpdatePressWhenFormIsInvalid (e) {
    e.preventDefault()
    // this.props.actions.createNotification('check your form')
  }

  handleEventDateInputChange (eventId, eventDateInputArg) {
    const isoDateInputString = eventDateInputArg.toISOString()
    this.props.actions.friendFormEventDateInputUpdate(eventId, isoDateInputString)
  }

  handleEventNameInputChange (eventId, eventNameInputArg) {
    this.props.actions.friendFormEventNameInputUpdate(eventId, eventNameInputArg)
  }

  onfriendFormEventCreateForNewFriendOrExistingFriend () {
    const { friendFormUpdatingSelectedFriendId } = this.props
    this.props.actions.friendFormEventCreate(friendFormUpdatingSelectedFriendId, undefined, undefined) // default eventName, default eventDate     // uses default params
  }

  onEventDateInputBoxFocus (eventId) {
    this.props.actions.friendFormEventDatePickerVisibilityStatusChange(true)
    this.props.actions.friendFormEventDatePickerSelectEvent(eventId)
  }
  render () {
    const {
      friendFormEventDatePickerSelectedEventId,
      friendFormUpdatingSelectedFriendId,
      friendFormEventDatePickerIsVisible,
      friendFormEventInput,
      friendFormNameInputHasError,
      friendFormIsVisible,
      // friendFormUpdatingSelectedFriendId,
      // friendFormNameInput,
      // friendFormBdayInput,
      friendName,
      // bday,
      isUpdating, // id
      actions,
      bottomNotificationVisibility,
      events
    } = this.props

    const onFriendFormUpdateOrCreate = () => {
      return (isUpdating)
      ? actions.friendFormUpdateAndSave(friendFormUpdatingSelectedFriendId)
      : actions.friendFormCreateAndSave()
    }

    // two events array: either from 'user reducer' state (permanant) or 'visible reducer' state (temp input)
    const whichEventArray = (isUpdating) ? events : friendFormEventInput
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
            <Title style={{color: colors.$bigHeadingTextColor }}>{isUpdating ? `Update ${friendName}` : `Create Friend`}
            </Title>
          </Header>
          <Content>
            <List>
            <ListItemDivider heading="Name" />
            <FriendFormNameInput
                friendFormNameInputHasError={friendFormNameInputHasError}
                handleOnChangeText={actions.friendFormFriendNameInputUpdate}
                defaultValue={isUpdating ? friendName : ''}
                placeholder={isUpdating ? friendName : 'Please Enter a Name'}
              />
            <ListItemDivider heading="Events" />
              {
                whichEventArray.map(({ eventId, eventName, eventDate }, eachIndex) => {
                  return (
                     <SwiperWrapper
                        key={eachIndex}
                        onSwipeDelete={actions.friendEventDelete.bind(this, eventId)}
                        >
                      <FriendFormEvent

                        defaultValue={eventName}
                        handleOnChangeText={this.handleEventNameInputChange.bind(this, eventId)}
                        isFocusedInputType={'name'}
                        isFocused={this.props.selectedEventsViewInput.eventId === eventId /*
                          this.props.selectedIdFromEventsView === eventId
                          it should auto scroll to the box that's focused */}
                        calendarModalIsVisible={eventId === friendFormEventDatePickerSelectedEventId}
                        eventDate={eventDate /* needs to be an isostring */}
                        isUpdating={isUpdating}
                        isVisible={friendFormEventDatePickerIsVisible}
                        onCancel={actions.friendFormEventDatePickerSelectEvent.bind(this, null)}
                        onEventDateInputOk={actions.friendFormEventDatePickerSelectEvent.bind(this, null)}
                        onEventDateInputBoxFocus={this.onEventDateInputBoxFocus.bind(this, eventId)}
                        onEventDateInputChange={this.handleEventDateInputChange.bind(this, eventId)}
                    />
                   </SwiperWrapper>
                  )
                })
              }
            </List>
          </Content>
          <Footer theme={LightTheme}>
            <FooterTab>
              <Button onPress={() => actions.friendFormCancel()}>
                CANCEL
                <Icon name='ios-close-circle-outline' />
              </Button>
              <Button onPress={() => { this.onfriendFormEventCreateForNewFriendOrExistingFriend() } }>
                ADD EVENT
                    <Icon name='ios-calendar-outline' /> {/* it seems that you can't add custom icons here */}
              </Button>
              <Button
                disabled={friendFormNameInputHasError}
                onPress={friendFormNameInputHasError ? (e) => this.handleCreateOrUpdatePressWhenFormIsInvalid(e) : () => onFriendFormUpdateOrCreate()}>
                {(isUpdating) ? 'UPDATE' : 'CREATE'}
                <Icon
                  name='ios-checkbox-outline'
                  textColor="red"
                />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Modal>
    )
  }
}

/* onRequestClose={() => friendFormVisibilityToggle()}  mandatory android prop */

const mstp = (state) => {
  let {
    friendFormEventDatePickerSelectedEventId,
    friendFormIsUpdating,
    friendFormIsVisible,
    friendFormEventDatePickerIsVisible,
    friendFormNameInput,
    friendFormBdayInput,
    friendFormEventInput, // [{"eventId":..., "eventDate:...", "eventName:..."}
    friendFormUpdatingSelectedFriendId
  } = state.friendForm
  let {
    bday,
    events,
    friendName
  } = Utils.getFriendByFriendId(state, friendFormUpdatingSelectedFriendId)
  events = (events && events.length) ? events : []

  let { selectedEventsViewInput } = state.eventsView
  selectedEventsViewInput = selectedEventsViewInput || {}
  friendFormEventInput = (friendFormEventInput && friendFormEventInput.length) ? friendFormEventInput : []  // show an empty event

  return {
    friendFormNameInputHasError: !friendFormNameInput,
    selectedEventsViewInput: selectedEventsViewInput,
    selectedIdFromEventsView: 12345,
    isUpdating: !!(friendFormIsUpdating && friendFormUpdatingSelectedFriendId),
    bday,
    events,
    friendFormEventInput,
    friendFormEventDatePickerSelectedEventId,
    friendName,
    friendFormIsVisible,
    friendFormEventDatePickerIsVisible,

    friendFormBdayInput,
    friendFormUpdatingSelectedFriendId
  }
}
const mdtp = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mstp, mdtp)(FriendFormCreateUpdate)
