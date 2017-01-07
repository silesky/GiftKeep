import {
  View,
  Modal
} from 'react-native';
import React, { PropTypes } from 'react';

export const ModalNotificationBottom = ({ notificationText, IsVisible }) => {
  return (
    <Modal 
    visible={IsVisible}
    animationType='fade'
    transparent='true'
    >
      <Text>{notificationText}</Text>
    </Modal>
  )
}

ModalNotificationBottom.PropTypes = {
  notificationText: React.PropTypes.string,
  IsVisible: React.PropTypes.bool,
}