
import React, {
  Component
} from 'react'
import {
  Input,
  InputGroup,

  Icon

} from 'native-base'
import { View } from 'react-native'
export const FriendFormEventNameInput = ({defaultValue, isFocused, handleOnChangeText}) => {
  console.log(defaultValue)
  return (
<View>
  <InputGroup  style={{paddingLeft: 10, marginLeft: 5, marginRight: 5, marginBottom: 5}} borderType="rounded" >
    <Icon name="md-happy" />
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
