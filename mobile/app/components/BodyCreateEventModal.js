import React from 'react'
import Moment from 'moment'
import * as actions from './../actions/'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Input } from 'native-base'
import {
  EventDatePicker,
  EventDateInputPicker,
  FriendFormEventNameInput,
  FriendFormEventDateInput,
  SimpleModalFormWrapper,
  BodyCreateThingModalFooterBtn
} from './../components/'
import { View, DatePickerIOS, Keyboard, LayoutAnimation } from 'react-native'
import { List, ListItem, Title, InputGroup, Button } from 'native-base'

import { IconCreator } from './../icons'
class BodyCreateEventModal extends React.Component {
  static PropTypes = {
    isVisible: React.PropTypes.bool,
  }
  static defaultProps = {
    date: Moment().add(1, 'day').toDate(),
    name: '',
  }
  constructor (props) {
    super(props)
    this.onCancelPress = this.onCancelPress.bind(this)
    this.onCreateEventPress = this.onCreateEventPress.bind(this)
    this.onEventNameChange = this.onEventNameChange.bind(this)
    this.onEventDateChange = this.onEventDateChange.bind(this)
    this.state = {
      date: this.props.date,
      name: this.props.name,
    }
  }

  onEventDateChange (date) {
    this.setState({ date })
  }
  onEventNameChange (name) {
    this.setState({ name })
  }
  onCreateEventPress () {
    const _eventName = this.state.name
    const _eventDate = this.state.date.toISOString()
    this.props.actions.createEvent(
      this.props.selectedFriendId,
      _eventName,
      _eventDate
    )
    this.onCancelPress()
  }
  onCancelPress () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.actions.bodyModalVisibilityFalse()
  }
  render () {
    return (
      <SimpleModalFormWrapper
        modalHeight={420}
        handleClickAway={this.props.actions.bodyModalVisibilityFalse}
        isVisible={this.props.createGiftModalVisibility}
      >
        <List>
          <Title style={{ marginTop: 10 }}>
            {IconCreator('FA', 'calendar-plus-o', 30, {
              paddingRight: 10,
              paddingTop: 5,
            })}
            Create Event
          </Title>
          <FriendFormEventNameInput
            eventNameList={this.props.eventNameList}
            placeholder={'Birthday, graduation, etc'}
            eventName={this.state.name}
            handleOnChangeText={this.onEventNameChange}
          />
          <EventDateInputPicker
            selectedEventDate={this.state.date}
            handleOnEventDateChange={this.onEventDateChange}
          />
          <BodyCreateThingModalFooterBtn
            okDisabled={!this.props.selectedFriendId}
            onOkPress={this.onCreateEventPress}
            onCancelPress={this.onCancelPress}
          />
        </List>
      </SimpleModalFormWrapper>
    )
  }
}
const mstp = state => {
  return {
    eventNameList: state.user.eventNameList,
    createGiftModalVisibility: state.visible.createEventModalVisibility,
    selectedFriendId: state.visible.selectedFriendId,
  }
}
const mdtp = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})
const connected = connect(mstp, mdtp)(BodyCreateEventModal);
export { connected as BodyCreateEventModal }
