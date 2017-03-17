import React from 'react'
import Moment from 'moment'
import * as actions from './../actions/'
import { bindActionCreators, } from 'redux'
import { connect, } from 'react-redux'
import { Input, } from './../sporks/native-base'
import {
  SimpleModalFormWrapper,
} from './../components/'
import {
  View,
  DatePickerIOS,
  Keyboard,
  LayoutAnimation,
} from 'react-native'
import {
  List,
  ListItem,
  Title,
  InputGroup,
  Button, }
from './../sporks/native-base'

import { IconCreator, } from './../icons'
class BodyCreateEventModal extends React.Component {
  static PropTypes = {
    isVisible: React.PropTypes.bool,
  }
  static defaultProps = {
    date: Moment().add(1, 'day').toDate(),
    name: '',
  };
  constructor (props) {
    super(props)
    this.onDateChange = this.onDateChange.bind(this)
    this.state = {
      date: this.props.date,
      name: this.props.name,
    }
  }
  onDateChange (date) {
    this.setState({ date, })
  }
  onCreateEventPress () {
    const _eventName = this.refs.eventName._textInput._lastNativeText
    const _eventDate = this.state.date.toISOString()
    this.props.actions.createEvent(this.props.selectedFriendId, _eventName, _eventDate)
    this.close()
  }
  close () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.actions.bodyModalVisibilityFalse()
  }
  render () {
    return (
      <SimpleModalFormWrapper
        modalHeight={420}
        handleClickAway={this.props.actions.bodyModalVisibilityFalse}
        isVisible={this.props.createGiftModalVisibility}>
        <List>
          <Title style={{ marginTop: 10, marginBottom: 10, }}>
          { IconCreator('FA', 'calendar-plus-o', 30, { paddingRight: 10, paddingTop: 5, }) }
            Create Event
         </Title>
          <ListItem>
            <InputGroup>
              <Input
                ref="eventName"
                inlineLabel
                label="Name"
                placeholder="Event Name..."
                placeholderTextColor='lightgrey'
                multiline={false}/>
            </InputGroup>
          </ListItem>
          <ListItem>
            <InputGroup>
              <Input
                onFocus={() => Keyboard.dismiss() /* this input is 'dumb', it only is for display purposes. It could just as well not be an input */}
                editable="false"
                inlineLabel
                label="Date"
                value={Moment(this.state.date).format('MM-DD-YYYY')}
               />
            </InputGroup>

          </ListItem>
          <DatePickerIOS
            minimimumDate={new Date()}
            mode="date"
            onDateChange={(date) => this.onDateChange(date)}
            date={this.state.date}

          />
          <View
            style={{
              marginTop: 15,
              marginBottom: 10,
              marginRight: 15,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}>
            <Button danger onPress={() => this.close()}>
              Cancel
            </Button>
            <Button
              onPress={() => this.onCreateEventPress()}
              style={{
                marginLeft: 10,
              }}
              success>
              OK
            </Button>
          </View>
        </List>
      </SimpleModalFormWrapper>
    )
  }
}
const mstp = (state) => {
  return {
    createGiftModalVisibility: state.visible.createEventModalVisibility,
    selectedFriendId: state.visible.selectedFriendId,
  }
}
const mdtp = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
})
export default connect(mstp, mdtp)(BodyCreateEventModal)
