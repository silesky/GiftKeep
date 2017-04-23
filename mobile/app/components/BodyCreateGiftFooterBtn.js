import React from 'react'
import { View, } from 'react-native'
import { Button, } from 'native-base'
import { FriendSelector } from './../components/'
export const BodyCreateGiftFooterBtn = ({
    onCancelPress,
    onOkPress,
    onFriendSelectPress,
}) => (
<View
  style={{
    marginTop: 15,
    marginBottom: 10,
    marginRight: 15,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  }}>

  <FriendSelector />
  <Button danger onPress={() => onCancelPress()}>
    Cancel
  </Button>
  <Button
    onPress={() => onOkPress()}
    style={{
      marginLeft: 10,
    }}
    success>
    OK
  </Button>


</View>
)
