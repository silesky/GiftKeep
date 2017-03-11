import React from 'react'
import { Input, InputGroup, Icon } from  './../sporks/native-base'


export const FriendFormNameInput = ({
  friendFormNameInputHasError,
  handleOnChangeText,
  defaultValue,
  placeholder,
  placeholderTextColor,
  ListItem
}) => {
  return (
    <InputGroup style={{ paddingLeft: 10, marginLeft: 5, marginRight: 5, marginBottom: 5, borderWidth: 0 }}>
      <Input
        defaultValue={defaultValue}
        onChangeText={(input) => handleOnChangeText(input)}
        placeholder={placeholder}
        placeholderTextColor={'#c9c9c9'}/>
      <Icon
        name='ios-person'
        style={{ color: friendFormNameInputHasError ? 'red' : 'green' }}
      />
    </InputGroup>

  )
}
