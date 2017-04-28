import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'native-base'
import { FriendSelector } from './../components/'
export const BodyCreateThingModalFooterBtn = ({
  onCancelPress,
  onOkPress,
  okDisabled,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container__buttons}>
        <FriendSelector />
        <Button danger onPress={() => onCancelPress()}>
          Cancel
        </Button>
        <Button
          disabled={okDisabled}
          success={!okDisabled}
          onPress={() => onOkPress()}
        >
          { okDisabled ? 'No Friend Selected!' : 'OK' }
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 15,
  },
  container__buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
