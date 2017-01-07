import React from 'react';
import {
  Modal,
  StyleSheet,
  View
} from 'react-native';
import { Text, Container } from 'native-base';


export const ModalNotificationBottom = ({ notificationText, IsVisible }) => {
  return (

    <Modal style={{flex: 1}}
      visible={true}
      animationType='fade'
      transparent={true}
      >
      <View 


      style={Styles.text_container__VIEW}>
       <Text 
          
       style={Styles.text}>{notificationText}</Text>
     </View>

   </Modal>
  )
}

ModalNotificationBottom.PropTypes = {
  notificationText: React.PropTypes.string,
  IsVisible: React.PropTypes.bool,
}

const Styles = StyleSheet.create({
  text_container__VIEW: {
    opacity: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'

 
  },
  text: {
    fontSize: 14,
    color: 'white',
    borderRadius: 5,
    backgroundColor: 'grey', 
    textAlign: 'justify',
    padding: 5,
    marginBottom: 60, // it shouldn't quite touch the bottom
  }
})