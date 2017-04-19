import React, { Component } from 'react'
import { Input, InputGroup } from 'native-base'
import {
  View,
  LayoutAnimation,
} from 'react-native'
import { EventNamePicker } from './../components/'

export class FriendFormEventNameInput extends Component {
  static defaultProps = {
    placeholder: 'Anniversary, Birthday...',
    inputProps: {},
    borderType: '',
    inputGroupStyle: {},
    eventName: null,
    isFocused: false,
    handleOnChangeText: null,
    eventNameList: [],
  }

  constructor (props) {
    super(props)
    this.state = {
      pickerVisibility: props.isFocused,
    }
  }
  togglePicker (bool) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({ pickerVisibility: bool })
  }
  render () {
    const {
      placeholder,
      borderType,
      inputGroupStyle,
      eventName,
      isFocused,
      handleOnChangeText,
      eventNameList,
    } = this.props

    return (
      <View>
        { this.state.pickerVisibility && <EventNamePicker
              selectedValue={eventName}
              onEventNamePick={(eventName) => {
                handleOnChangeText(eventName)
                setTimeout(this.togglePicker.bind(this, false), 200)
              }}
              eventNameList={eventNameList}
            />
        }
        <InputGroup style={inputGroupStyle} borderType={borderType}>
          <Input
            onFocus={() => this.togglePicker(true)}
            autoFocus={isFocused}
            defaultValue={eventName}
            onChangeText={(eventName) => handleOnChangeText()}
            onSubmitEditing={() => this.togglePicker(false)}
            placeholder={placeholder}
            placeholderTextColor='#c9c9c9'
            />
        </InputGroup>
      </View>
    )
  }
}
