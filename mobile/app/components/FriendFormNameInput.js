import React from 'react'
import {Input, InputGroup, Icon} from 'native-base'
export const FriendFormNameInput = ({handleOnChangeText, thing, defaultValue, placeholder, placeholderTextColor, ListItem}) => {
  return (
    <InputGroup>
      <Input
        defaultValue={defaultValue}
        onChangeText={(input) => handleOnChangeText(input)}
        placeholder={placeholder}
        placeholderTextColor={'#c9c9c9'}/>
      <Icon name="ios-person"/>
    </InputGroup>
  )
}
