import React from 'react'
import { Input, InputGroup, Icon } from  './../sporks/native-base'


const InputGroupErrorYesOrNo = ({ hasError, styles, children }) => {
  return ((hasError)
    ? <InputGroup style={styles} error>{children}</InputGroup>
    : <InputGroup style={styles} succcess>{children}</InputGroup>)
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
    <InputGroupErrorYesOrNo
        styles={{ paddingLeft: 10, marginLeft: 5, marginRight: 5, marginBottom: 5 }}
        hasError={friendFormNameInputHasError}
    >
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
