
import React, {
  Component
} from 'react'
import {
  Input,
  InputGroup,

  Icon

} from  './../sporks/native-base'
import { View } from 'react-native'
export const FriendFormEventNameInput = ({ borderType, inputGroupStyle, defaultValue, isFocused, handleOnChangeText }) => {
  console.log(defaultValue)
  return (
<View>
  <InputGroup style={inputGroupStyle} borderType={borderType} >
    <Input
      autoFocus={isFocused}
      defaultValue={defaultValue}
      onChangeText={(eventNameInputArg) => handleOnChangeText(eventNameInputArg)}
      placeholder='Birthday, graduation, anniversary...'
      placeholderTextColor='#c9c9c9'
      />
  </InputGroup>
  </View>
  )
}
