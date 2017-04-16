import React, {Component} from 'react'
import {Input, InputGroup, Icon} from './../sporks/native-base'
import {
  View,
  Modal,
  Content,
  Card,
  Title,
  Button,
  CardItem
} from 'react-native'
export class FriendFormEventNameInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      inputIsFocused: props.isFocused,
    }
  }
  toggleFocus (bool) {
    this.setState({ inputIsFocused: bool })
  }

  render() {
    const {
      borderType,
      handleOnNameInputFocus,
      inputGroupStyle,
      defaultValue,
      isFocused,
      handleOnChangeText
    } = this.props
    return (
      <View>
        <InputGroup style={inputGroupStyle} borderType={borderType}>
          <Input
            onFocus={() => this.toggleFocus(true)}
            autoFocus={this.state.inputIsFocused}
            defaultValue={defaultValue}
            onChangeText={(eventNameInputArg) => handleOnChangeText(eventNameInputArg)}
            placeholder='Birthday, graduation, anniversary...'
            placeholderTextColor='#c9c9c9'/>
        </InputGroup>
      </View>
    )
  }
}
