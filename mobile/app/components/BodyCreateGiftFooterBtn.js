import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'native-base'
import { FriendSelector } from './../components/'
export const BodyCreateGiftFooterBtn = ({
  onCancelPress,
  onOkPress,
  onFriendSelectPress
}) => (
  <View style={styles.container}>
    <View style={styles.container__buttons}>
      <FriendSelector />
      <Button danger onPress={() => onCancelPress()}>
        Cancel
      </Button>
      <Button onPress={() => onOkPress()} style={styles.button} success>
        OK
      </Button>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  container__buttons: {
    width: 180,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {}
})
