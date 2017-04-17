import React, { Component } from 'react'
import { Input, InputGroup, Icon } from './../sporks/native-base'
import {
  View,
  Modal,
  Content,
  Card,
  Title,
  Button,
  CardItem,
  LayoutAnimation
} from 'react-native'
import { FriendFormEventNamePicker } from './../components/'
export class FriendFormEventNameInput extends Component {
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
      borderType,
      inputGroupStyle,
      eventName,
      isFocused,
      handleOnChangeText,
    } = this.props
    const labelArr = [ 'Anniversary', 'Birthday', 'Christmas', 'Chanukah' ]
    const placeholderString = labelArr
    .filter((el, ind) => ind < 3)
    .join(', ')
    return (
      <View>
        { this.state.pickerVisibility &&
          <FriendFormEventNamePicker
              pickerStyle={{height: 150}}
              selectedValue={eventName}
              onEventNamePick={(eventName) => {
                handleOnChangeText(eventName)
                setTimeout(this.togglePicker.bind(this, false), 200)
              }}
              labelArr={labelArr}
            />
        }
        <InputGroup style={inputGroupStyle} borderType={borderType}>
          <Input
            onFocus={() => this.togglePicker(true)}
            autoFocus={isFocused}
            defaultValue={eventName}
            onChangeText={(eventName) => handleOnChangeText()}
            onSubmitEditing={() => this.togglePicker(false)}
            placeholder={`${placeholderString}...`}
            placeholderTextColor='#c9c9c9'/>
        </InputGroup>
      </View>
    )
  }
}
