import React from 'react'
import Moment from 'moment'
import * as actions from './../actions/'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input } from 'native-base'
import { SimpleModalFormWrapper, BodyModalEventDatePicker } from './../components/'
import { getFriendByFriendId } from './../utils/'
import { View, DatePickerIOS, Keyboard } from 'react-native'
import { List, ListItem, Title, InputGroup, Button } from 'native-base'

class BodyCreateEventModal extends React.Component {
  static PropTypes = {
    isVisible: React.PropTypes.bool
  }
  static defaultProps = {
    date: Moment().add(1, 'day').toDate(),
    name: '',
  };
  constructor (props) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
    this.state = {
       date: this.props.date,
       name: this.props.name,
    }
  }
  onDateChange(date) {

    this.setState({date})

  }
  onCreateEventPress () {
    const _eventName = this.refs.eventName._textInput._lastNativeText
    const _eventDate = this.state.date.toISOString()
    this.props.actions.createEvent(this.props.selectedFriendId, _eventName, _eventDate)
    this.props.actions.bodyModalVisibilityFalse()
  }
  render () {
    return (
      <SimpleModalFormWrapper
        modalHeight={390}
        handleClickAway={this.props.actions.bodyModalVisibilityFalse}
        isVisible={this.props.createGiftModalVisibility}>
        <List>
          <Title style={{
            marginTop: 10
          }}>Create Event</Title>
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

          {/* <BodyModalEventDatePicker
            calendarModalIsVisible={false}
              /> */}

          <View
            style={{
              marginTop: 10,
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              flexDirection: 'row'
            }}>
            <Button danger onPress={() => this.props.actions.bodyModalVisibilityFalse()}>
              Cancel
            </Button>
            <Button
              onPress={() => this.onCreateEventPress()}
              style={{
                marginLeft: 5
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
  const { gifts } = getFriendByFriendId(state, state.visible.selectedFriendId)
  return {
    latestGift: gifts[gifts.length - 1],
    createGiftModalVisibility: state.visible.createEventModalVisibility,
    selectedFriendId: state.visible.selectedFriendId
  }
}
const mdtp = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
})
export default connect(mstp, mdtp)(BodyCreateEventModal)
