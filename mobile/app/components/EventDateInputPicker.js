import React, { Component } from 'react'
import { Input, InputGroup, Icon } from 'native-base'
import {
  View,
  Modal,
  Content,
  Card,
  Title,
  Button,
  CardItem,
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
    this.onEventDateInputChange = this.onEventDateInputChange.bind(this)
  }
  togglePicker (bool) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({ pickerVisibility: bool })
  }
  onEventDateInputChange (input) {
    this.props.handleOnEventDateChange(input)
    setTimeout(this.togglePicker.bind(this, false), 200)
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
        { this.state.pickerVisibility &&
          <EventDatePicker
              selectedEventDate={selectedEventDate}
              onEventDateInputChange={this.onEventDateInputChange}
            />
        }
        <InputGroup style={inputGroupStyle} borderType={borderType}>
          <Input
            onFocus={() => this.togglePicker(true)}
            autoFocus={isFocused}
            value={Moment(selectedEventDate).format('MM-DD-YYYY')}
            editable={false}
            />
        </InputGroup>
      </View>
    )
  }
}
