import React from 'react'
import {
  Modal,
  StyleSheet,
  View
} from 'react-native'
import { Text, Container } from 'native-base'

export const NotificationBottom = ({ notificationText }) => {
  NotificationBottom.PropTypes = {
    notificationText: React.PropTypes.string
  }
  return (
    <View style={Styles.view_container}>
        <View style={Styles.text_container__VIEW}>
          <Text style={Styles.text}>{notificationText}</Text>
        </View>
      </View>
  )
}

const Styles = StyleSheet.create({
  view_container: {
    position: 'relative',
    bottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  text_container__VIEW: {
    opacity: 0.5,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 8
  },
  text: {
    fontSize: 14,
    color: 'white',
    textAlign: 'justify'
  }
})
