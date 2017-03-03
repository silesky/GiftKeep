import React from 'react'
import { Input, InputGroup, Icon } from 'native-base'

const InputGroupErrorYesOrNo = ({ hasError, children }) => {
  return ((hasError)
    ? <InputGroup error>{children}</InputGroup>
    : <InputGroup succcess>{children}</InputGroup>)
}

export const FriendFormNameInput = ({
  friendFormNameInputHasError,
  handleOnChangeText,
  defaultValue,
  placeholder,
  placeholderTextColor,
  ListItem
}) => {
  return (
    <InputGroupErrorYesOrNo hasError={friendFormNameInputHasError}>
      <Input
        defaultValue={defaultValue}
        onChangeText={(input) => handleOnChangeText(input)}
        placeholder={placeholder}
        placeholderTextColor={'#c9c9c9'}/>
      <Icon
        name='ios-person'
        style={{ color: friendFormNameInputHasError ? 'red' : 'green' }}
      />
    </InputGroupErrorYesOrNo>

  )
}
