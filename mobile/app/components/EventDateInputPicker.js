import React, { Component } from 'react'
import { Input, InputGroup, Icon } from 'native-base'
import {
  View,
  LayoutAnimation,
  Keyboard,
} from 'react-native'
import { EventDatePicker } from './../components/'
import Moment from 'moment'
export class EventDateInputPicker extends Component {

  static defaultProps = {
    handleOnEventDateChange: null,
    selectedEventDate: new Date(),
    isFocused: false,
  }

  constructor (props) {
    super(props)
    this.state = {
      pickerVisibility: props.isOpen,
    }
    this.onFocus = this.onFocus.bind(this)
    this.onEventDateInputChange = this.onEventDateInputChange.bind(this)
  }

  onFocus () {
    this.togglePicker(true)
    Keyboard.dismiss()
  }

  togglePicker (bool) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({ pickerVisibility: bool })
  }

  onEventDateInputChange (date) {
    this.props.handleOnEventDateChange(date)
    const newDate = Moment(date)
    const oldDate = Moment(this.props.selectedEventDate)
    const dayHasChanged = newDate.date() !== oldDate.date()
    const yearHasChanged = newDate.year() !== oldDate.year()
    // don't hide picker automatically if only month changes
    if (dayHasChanged || yearHasChanged) {
      setTimeout(this.togglePicker.bind(this, false), 200)
    }
  }

  render () {
    const {
      selectedEventDate,
      inputGroupStyle,
      borderType,
      isFocused,
    } = this.props
    return (
      <View>
        {this.state.pickerVisibility &&
          <EventDatePicker
            selectedEventDate={selectedEventDate}
            onEventDateInputChange={this.onEventDateInputChange}
          />}
        <InputGroup style={inputGroupStyle} borderType={borderType}>
          <Input
            editable={false}
            onFocus={() => this.onFocus() }
            autoFocus={isFocused}
            value={Moment(selectedEventDate).format('MM-DD-YYYY')}
          />
        </InputGroup>
      </View>
    )
  }
}
